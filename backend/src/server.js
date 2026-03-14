import express from 'express';
import cors from 'cors';
import { getEnv } from './lib/env.js';
import { insertChatMessage } from './services/supabase.js';

const env = getEnv();
const app = express();

app.use(cors({ origin: env.corsOrigin === '*' ? true : env.corsOrigin }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'flixcod-api',
    supabaseConfigured: env.isConfigured,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/config', (_req, res) => {
  res.json({
    mode: 'device-first',
    providers: ['Open Code', 'Google Gemini', 'openclaw', 'Open Source'],
    storage: env.isConfigured ? 'supabase' : 'memory-only'
  });
});

app.post('/api/chat', async (req, res) => {
  const {
    message = '',
    provider = 'Open Source',
    model = 'default',
    localMode = true,
    userId = 'anonymous'
  } = req.body || {};

  const cleanMessage = String(message).trim();
  if (!cleanMessage) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  const output = `FlixCod> ${cleanMessage}`;

  const dbResult = await insertChatMessage({
    user_id: userId,
    provider,
    model,
    local_mode: localMode,
    input_text: cleanMessage,
    output_text: output
  });

  return res.json({
    output,
    provider,
    model,
    mode: localMode ? 'local-device' : 'cloud-proxy',
    persisted: dbResult.ok,
    persistenceMessage: dbResult.ok ? 'Saved to Supabase.' : dbResult.reason
  });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(env.port, () => {
  console.log(`FlixCod backend listening on http://localhost:${env.port}`);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'flixcod-api', timestamp: new Date().toISOString() });
});

app.post('/api/chat', (req, res) => {
  const { message = '', provider = 'Open Source', model = 'default', localMode = true } = req.body || {};

  res.json({
    output: `Echo: ${message}`,
    provider,
    model,
    mode: localMode ? 'local-device' : 'cloud-proxy',
    note: 'Starter endpoint جاهز للربط مع Gemini/OpenRouter/Supabase Edge Functions.'
  });
});

const port = process.env.PORT || 8787;
app.listen(port, () => {
  console.log(`FlixCod backend listening on http://localhost:${port}`);
});
