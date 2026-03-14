import express from 'express';
import cors from 'cors';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '..', 'data', 'db.json');

const app = express();
app.use(cors());
app.use(express.json());

async function ensureDb() {
  const dir = path.dirname(dbPath);
  await fs.mkdir(dir, { recursive: true });

  try {
    await fs.access(dbPath);
  } catch {
    const initialData = {
      users: [],
      toolEvents: [],
      createdAt: new Date().toISOString(),
      version: 1
    };
    await fs.writeFile(dbPath, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

async function readDb() {
  await ensureDb();
  const raw = await fs.readFile(dbPath, 'utf-8');
  return JSON.parse(raw);
}

async function writeDb(nextDb) {
  await fs.writeFile(dbPath, JSON.stringify(nextDb, null, 2), 'utf-8');
}

const validateEmail = (email) => /^(?:[^\s@]+)@(?:[^\s@]+)\.[^\s@]{2,}$/.test(email);

async function authRequired(req, res, next) {
  const userId = req.header('x-user-id');
  if (!userId) {
    return res.status(401).json({ error: 'registration_required', message: 'User registration is required to use tools.' });
  }

  const db = await readDb();
  const user = db.users.find((item) => item.id === userId);
  if (!user) {
    return res.status(401).json({ error: 'invalid_user', message: 'Session is invalid. Please register again.' });
  }

  req.user = user;
  return next();
}

app.get('/api/health', async (_req, res) => {
  const db = await readDb();
  res.json({
    status: 'ok',
    service: 'flixcod-api',
    timestamp: new Date().toISOString(),
    users: db.users.length,
    events: db.toolEvents.length
  });
});

app.post('/api/auth/register', async (req, res) => {
  const { name = '', email = '' } = req.body || {};
  const safeName = String(name).trim();
  const safeEmail = String(email).trim().toLowerCase();

  if (safeName.length < 2) {
    return res.status(400).json({ error: 'invalid_name', message: 'Name must be at least 2 characters.' });
  }

  if (!validateEmail(safeEmail)) {
    return res.status(400).json({ error: 'invalid_email', message: 'Please enter a valid email address.' });
  }

  const db = await readDb();
  let user = db.users.find((item) => item.email === safeEmail);

  if (!user) {
    user = {
      id: crypto.randomUUID(),
      name: safeName,
      email: safeEmail,
      createdAt: new Date().toISOString(),
      plan: 'free'
    };
    db.users.push(user);
    await writeDb(db);
  }

  return res.status(201).json({
    message: 'Registered successfully',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      plan: user.plan
    }
  });
});

app.get('/api/tools', authRequired, (_req, res) => {
  res.json({
    tools: [
      { key: 'chat', name: 'AI Chat', requiresRegistration: true },
      { key: 'terminal-helper', name: 'Terminal Helper', requiresRegistration: true },
      { key: 'deploy-guide', name: 'Deploy Guide', requiresRegistration: true }
    ]
  });
});

app.post('/api/chat', authRequired, async (req, res) => {
  const { message = '', provider = 'Open Source', model = 'default', localMode = true } = req.body || {};
  const db = await readDb();

  db.toolEvents.push({
    id: crypto.randomUUID(),
    type: 'chat',
    userId: req.user.id,
    provider,
    model,
    localMode: Boolean(localMode),
    messageLength: String(message).trim().length,
    at: new Date().toISOString()
  });
  await writeDb(db);

  res.json({
    output: `Echo: ${message}`,
    provider,
    model,
    mode: localMode ? 'local-device' : 'cloud-proxy',
    note: 'Starter endpoint جاهز للربط مع Gemini/OpenRouter/Supabase Edge Functions.'
  });
});

const port = process.env.PORT || 8787;
ensureDb().then(() => {
  app.listen(port, () => {
    console.log(`FlixCod backend listening on http://localhost:${port}`);
  });
});
