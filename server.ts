import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { sanitizeAndValidateOutput, heuristicFallback, FreedomMapSchema } from './api/_lib/freedomEngine';
import { getCounter, incrementCounter } from './api/_lib/counter';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '100kb' }));

// OpenRouter model choices
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet';

// -------------------------------------------------------------
// LOCAL DEV API ROUTES (Mirrors Vercel Serverless Functions)
// -------------------------------------------------------------

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Anonymous counter (Read)
app.get('/api/counter', async (req, res) => {
  const count = await getCounter();
  res.json({ count, success: true });
});

// Anonymous counter (Increment)
app.post('/api/counter/increment', async (req, res) => {
  const count = await incrementCounter();
  res.json({ count, success: true });
});

// Primary AI Interpretation Endpoint using OpenRouter only
app.post('/api/generate-freedom-map', async (req, res) => {
  const currentCount = await incrementCounter();

  try {
    const rawInput = req.body?.thought || req.body?.input;
    if (!rawInput || typeof rawInput !== 'string') {
      return res.status(400).json({ error: 'Please share a thought or decision.' });
    }

    const userInput = rawInput.trim().slice(0, 500);
    if (userInput.length < 2) {
      return res.status(400).json({ error: 'Input is too short.' });
    }

    const systemPrompt = `You are the Decision Intelligence Interpreter for "MY INDIA. MY FREEDOM. 🇮🇳" (Independence Day 2026).
Your task is to interpret the user's natural language struggle/desire and extract a clear, uplifting Freedom Map structure.

CRITICAL RULES:
- Output ONLY valid JSON matching this exact schema:
{
  "freedomFrom": "Concise phrase naming the past weight, fear, pattern, or friction to shed (3-6 words)",
  "freedomToward": "Concise phrase naming the desired state of autonomy, clarity, or sovereignty (3-6 words)",
  "coreContext": "Refined summary of what the user is navigating (1 concise sentence)",
  "factors": [
    "Key strategic lever or factor 1 (short phrase)",
    "Key strategic lever or factor 2 (short phrase)",
    "Key strategic lever or factor 3 (short phrase)",
    "Key strategic lever or factor 4 (short phrase)"
  ],
  "firstStep": "One immediate, practical, empowering micro-action to take in 24-48 hours (1 sentence)",
  "freedomStatement": "An inspiring, memorable personal declaration starting with 'I choose...' (max 8-12 words)"
}
- Maintain high emotional resonance, dignified restraint, and practical clarity.
- Do NOT include markdown code blocks or explanatory text. Return ONLY raw JSON.`;

    let generatedData: FreedomMapSchema | null = null;

    // 1. Try OpenRouter API
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    if (openRouterKey && openRouterKey.trim().length > 5) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openRouterKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': process.env.APP_URL || 'https://myindiamyfreedom.app',
            'X-Title': 'My India My Freedom'
          },
          body: JSON.stringify({
            model: OPENROUTER_MODEL,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: `User thought: "${userInput}"` }
            ],
            temperature: 0.7,
            max_tokens: 600,
            response_format: { type: 'json_object' }
          })
        });

        if (response.ok) {
          const json = await response.json();
          const content = json.choices?.[0]?.message?.content;
          if (content) {
            const parsed = JSON.parse(content.replace(/```json/g, '').replace(/```/g, '').trim());
            generatedData = sanitizeAndValidateOutput(parsed, userInput);
          }
        }
      } catch (orErr) {
        console.warn('OpenRouter call fell back to deterministic heuristic:', (orErr as Error)?.message);
      }
    }

    // 2. Deterministic heuristic extraction if OpenRouter is unconfigured or fails
    if (!generatedData) {
      generatedData = heuristicFallback(userInput);
    }

    // Respond with sanitized Freedom Map
    return res.json({
      success: true,
      data: {
        ...generatedData,
        originalThought: userInput
      },
      counter: currentCount
    });
  } catch (error) {
    console.error('Error generating freedom map:', error);
    const fallback = heuristicFallback('Unlocking clarity and momentum');
    return res.json({
      success: true,
      data: fallback,
      counter: currentCount
    });
  }
});

// -------------------------------------------------------------
// VITE MIDDLEWARE & SERVER STARTUP (Local Dev / Cloud Run)
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🇮🇳 MY INDIA. MY FREEDOM. running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
