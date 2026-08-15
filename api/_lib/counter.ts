// Lightweight persistence handler for Vercel Serverless
// Supports optional KV / Redis / Upstash if configured in environment,
// otherwise uses reliable in-memory counter with baseline.

const BASELINE_COUNT = 2000;
const INCREMENT_STEP = 5;
let inMemoryCounter = BASELINE_COUNT;

export async function getCounter(): Promise<number> {
  const kvRestApiUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvRestApiToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (kvRestApiUrl && kvRestApiToken) {
    try {
      const response = await fetch(`${kvRestApiUrl}/get/my_india_freedom_counter`, {
        headers: {
          Authorization: `Bearer ${kvRestApiToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data && data.result !== null && data.result !== undefined) {
          const parsed = parseInt(String(data.result), 10);
          if (!isNaN(parsed) && parsed >= BASELINE_COUNT) {
            inMemoryCounter = Math.max(inMemoryCounter, parsed);
            return inMemoryCounter;
          }
        }
      }
    } catch (e) {
      console.warn('Optional KV read failed, using memory fallback:', e);
    }
  }

  return inMemoryCounter;
}

export async function incrementCounter(): Promise<number> {
  const kvRestApiUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvRestApiToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  inMemoryCounter += INCREMENT_STEP;

  if (kvRestApiUrl && kvRestApiToken) {
    try {
      // Use INCRBY if supported or update key
      const response = await fetch(`${kvRestApiUrl}/incrby/my_india_freedom_counter/${INCREMENT_STEP}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${kvRestApiToken}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (data && data.result !== null && data.result !== undefined) {
          const parsed = parseInt(String(data.result), 10);
          if (!isNaN(parsed)) {
            if (parsed < inMemoryCounter) {
              await fetch(`${kvRestApiUrl}/set/my_india_freedom_counter/${inMemoryCounter}`, {
                headers: { Authorization: `Bearer ${kvRestApiToken}` }
              });
              return inMemoryCounter;
            }
            return parsed;
          }
        }
      }
    } catch (e) {
      console.warn('Optional KV increment failed, using memory fallback:', e);
    }
  }

  return inMemoryCounter;
}

