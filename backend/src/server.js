import express from 'express';
import cors from 'cors';

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
