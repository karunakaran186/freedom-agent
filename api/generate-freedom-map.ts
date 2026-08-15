import type { IncomingMessage, ServerResponse } from 'http';
import { sanitizeAndValidateOutput, heuristicFallback, FreedomMapSchema } from './_lib/freedomEngine';
import { incrementCounter } from './_lib/counter';

function parseRequestBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 50000) {
        req.destroy();
        resolve({});
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => {
      resolve({});
    });
  });
}

/**
 * Vercel Serverless Function: POST /api/generate-freedom-map
 * Pure Node.js http (IncomingMessage, ServerResponse) - Zero Express dependency.
 */
export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  const currentCount = await incrementCounter();

  try {
    const body = await parseRequestBody(req);
    const rawInput = body?.thought || body?.input;

    if (!rawInput || typeof rawInput !== 'string') {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Please share a thought or decision.' }));
      return;
    }

    const userInput = rawInput.trim().slice(0, 500);
    if (userInput.length < 2) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: 'Input is too short.' }));
      return;
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

    // OpenRouter integration
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet';

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
            model: model,
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
        console.warn('OpenRouter call fell back to heuristic engine:', (orErr as Error)?.message);
      }
    }

    // Deterministic heuristic fallback if OpenRouter is unconfigured or unavailable
    if (!generatedData) {
      generatedData = heuristicFallback(userInput);
    }

    res.statusCode = 200;
    res.end(JSON.stringify({
      success: true,
      data: {
        ...generatedData,
        originalThought: userInput
      },
      counter: currentCount
    }));
  } catch (error) {
    console.error('Error generating freedom map:', error);
    const fallback = heuristicFallback('Unlocking clarity and momentum');
    res.statusCode = 200;
    res.end(JSON.stringify({
      success: true,
      data: fallback,
      counter: currentCount
    }));
  }
}
