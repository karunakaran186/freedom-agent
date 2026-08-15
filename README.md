# MY INDIA. MY FREEDOM. 🇮🇳
### Powered by Lykspire | Decision Architect agents

> **"India became free in 1947. What do you want to be free from in 2026?"**  
> *One thought is enough.*

An interactive Independence Day 2026 viral microsite designed for Indian users to map internal breakthroughs, career pivots, financial clarity, and life decisions into an interactive, visual **Freedom Map**.

---

## 🌟 Core Architecture & Privacy Principles

- **Zero User Data Storage**: 100% ephemeral, private, and privacy-first. No database records, no user accounts, no login/passwords, no cookies tracking personal identity. User input exists only in memory during processing.
- **Anonymous Metric Counter**: The only persistent metric is the total number of Freedom Maps created (with optional KV / Redis integration or in-memory fallback).
- **OpenRouter AI Engine**: Server-side OpenRouter integration with strict schema validation (`freedomFrom`, `freedomToward`, `coreContext`, `factors`, `firstStep`, `freedomStatement`) and deterministic heuristic fallback when no API key is set.
- **100% Vercel Serverless Ready**: Native Vercel Serverless API routes (`/api/generate-freedom-map`, `/api/counter`, `/api/counter/increment`, `/api/health`) and static Vite SPA hosting.
- **Interactive Graph**: SVG canvas with trailing particle flow, real-time synthesis, zoom, pan, node expansion, and subtle Indian tricolor accents.
- **Viral Share Studio**: Instant 1-click PNG image exporter supporting **4:5 Instagram Feed** and **9:16 Instagram Story** formats, native Web Share API, and WhatsApp 1-tap sharing.
- **Full Accessibility (WCAG AA)**: Includes accessible structured text alternative view.

---

## 🚀 How to Deploy to Vercel (Step-by-Step)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "feat: My India My Freedom - Vercel Ready"
git branch -M main
git remote add origin https://github.com/your-username/my-india-my-freedom.git
git push -u origin main
```

### 2. Import into Vercel
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **"Add New..."** → **"Project"**.
3. Select your GitHub repository `my-india-my-freedom` and click **Import**.
4. Framework Preset: **Vite** (Vercel auto-detects Vite).
5. Build Command: `npm run build`
6. Output Directory: `dist`

### 3. Add Environment Variables in Vercel
In the Vercel Project Settings → **Environment Variables**, add:

| Variable Name | Required | Description | Example |
|---|---|---|---|
| `OPENROUTER_API_KEY` | Recommended | Your OpenRouter API Key | `sk-or-v1-...` |
| `OPENROUTER_MODEL` | Optional | OpenRouter Model ID (default: `anthropic/claude-3.5-sonnet`) | `anthropic/claude-3.5-sonnet` |
| `APP_URL` | Optional | Your production URL | `https://myindiamyfreedom.app` |
| `KV_REST_API_URL` | Optional | Vercel KV / Upstash Redis REST URL | `https://...upstash.io` |
| `KV_REST_API_TOKEN` | Optional | Vercel KV / Upstash Redis REST Token | `AX...` |

*(Note: If `OPENROUTER_API_KEY` is omitted, the app smoothly uses the deterministic heuristics engine without crashing.)*

### 4. Deploy
Click **"Deploy"**. Vercel will build the frontend into `dist/` and configure `/api/*` serverless functions automatically.

### 5. Connect a Custom Domain
1. In your Vercel Project Dashboard, navigate to **Settings** → **Domains**.
2. Enter your custom domain (e.g. `myindiamyfreedom.in` or `myindiamyfreedom.app`).
3. Add the provided CNAME / A records in your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.).
4. Vercel will automatically provision SSL certificates.

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env

# 3. Start local development server
npm run dev

# 4. Lint and verify build
npm run lint
npm run build
```

---

## 📁 Project Structure

```
├── api/                             # Vercel Serverless Functions
│   ├── _lib/
│   │   ├── counter.ts               # Anonymous counter & optional KV persistence
│   │   └── freedomEngine.ts         # Validation, sanitization & heuristic engine
│   ├── counter/
│   │   └── increment.ts             # POST /api/counter/increment
│   ├── counter.ts                   # GET /api/counter
│   ├── generate-freedom-map.ts      # POST /api/generate-freedom-map (OpenRouter)
│   └── health.ts                    # GET /api/health
├── src/                             # Vite + React 19 Frontend
│   ├── components/                  # UI Views, Graph, Modals & Share Studio
│   ├── lib/                         # Client-side graph builder & canvas exporter
│   ├── App.tsx                      # Main app controller
│   └── index.css                    # Tailwind CSS v4 styling
├── public/                          # Static assets
├── server.ts                        # Local dev Express server
├── vercel.json                      # Vercel routing & SPA rewrites
└── package.json
```

---

## 🎨 Color System & Design Language

- **DecisionOS Foundation**: Deep Indigo (`#6366F1`), Electric Cyan (`#06B6D4`, `#0EA5E9`), Slate (`#0F172A`).
- **Independence Day Accents**: Subtle Saffron (`#FF9933`), Pure White (`#FFFFFF`), India Green (`#138808`), Ashoka Blue (`#000080`).
- **Typography**: Plus Jakarta Sans & Playfair Display.

---

## ⚖️ License
Apache-2.0. Powered by Lykspire | DecisionOS™.
