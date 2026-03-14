import { useMemo, useState } from 'react';
import ChatWindow from './components/ChatWindow';
import { translations } from './i18n/translations';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8787';

const providers = {
  'Open Code': ['open-code-lite', 'open-code-proxy'],
  'Google Gemini': ['gemini-1.5-flash', 'gemini-2.0-flash-exp'],
  OpenClaw: ['openclaw-chat', 'openclaw-coder'],
  'Open Source': ['Qwen2.5-Coder-7B-Instruct', 'Llama-3.1-8B-Instruct']
};

export default function App() {
  const [language, setLanguage] = useState('ar');
  const [theme, setTheme] = useState('dark');
  const [provider, setProvider] = useState('Open Source');
  const [model, setModel] = useState(providers['Open Source'][0]);
  const [localMode, setLocalMode] = useState(true);
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const t = translations[language];
  const dir = language === 'ar' ? 'rtl' : 'ltr';
  const providerModels = useMemo(() => providers[provider] ?? [], [provider]);

  const handleProviderChange = (nextProvider) => {
    setProvider(nextProvider);
    setModel(providers[nextProvider][0]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatusMsg('');

    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });

      if (!response.ok) throw new Error('registration_failed');

      const data = await response.json();
      setUser(data.user);
      setStatusMsg(t.registerSuccess);
    } catch {
      setStatusMsg(t.registerError);
    }
  };

  const connectProvider = () => {
    if (!user) {
      setStatusMsg(t.requiredToUseTools);
      return;
    }

    localStorage.setItem(
      'flixcod-provider',
      JSON.stringify({ provider, model, localMode, userId: user.id, at: new Date().toISOString() })
    );
    setConnected(true);
    setTimeout(() => setConnected(false), 1800);
  };

  return (
    <main className={`app ${theme}`} dir={dir}>
      <section className="app-shell">
        <header className="topbar">
          <div className="title-wrap">
            <h1>{t.appTitle}</h1>
            <p>{t.appTagline}</p>
          </div>

          <div className="controls" role="group" aria-label="Preferences">
            <select value={language} onChange={(e) => setLanguage(e.target.value)} aria-label={t.lang}>
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
            <select value={theme} onChange={(e) => setTheme(e.target.value)} aria-label={t.theme}>
              <option value="dark">{t.dark}</option>
              <option value="light">{t.light}</option>
            </select>
          </div>
        </header>

        <section className="register-box">
          <div className="register-head">
            <div>
              <strong>{t.freeCta}</strong>
              <p>{t.freeCtaHint}</p>
            </div>
          </div>

          <form className="register-form" onSubmit={handleRegister}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              placeholder={t.registerName}
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder={t.registerEmail}
            />
            <button type="submit">{t.registerButton}</button>
          </form>

          {user ? <p className="success">{`${t.registeredAs} ${user.name}`}</p> : null}
          {statusMsg ? <p className="status-msg">{statusMsg}</p> : null}
        </section>

        <section className="bridge-box">
          <h2>{t.loginHint}</h2>
          <div className="grid">
            <select value={provider} onChange={(e) => handleProviderChange(e.target.value)} disabled={!user}>
              {Object.keys(providers).map((item) => (
                <option key={item} value={item}>
                  {t.provider}: {item}
                </option>
              ))}
            </select>

            <select value={model} onChange={(e) => setModel(e.target.value)} disabled={!user}>
              {providerModels.map((item) => (
                <option key={item} value={item}>
                  {t.model}: {item}
                </option>
              ))}
            </select>

            <label className="checkbox">
              <input
                type="checkbox"
                checked={localMode}
                onChange={(e) => setLocalMode(e.target.checked)}
                disabled={!user}
              />
              <span>
                {t.localMode}
                <small>{t.localModeDesc}</small>
              </span>
            </label>

            <button type="button" className="connect" onClick={connectProvider} disabled={!user}>
              {connected ? t.connected : t.connect}
            </button>
          </div>
        </section>

        <ChatWindow
          t={t}
          language={language}
          provider={provider}
          model={model}
          localMode={localMode}
          user={user}
        />
      </section>
    </main>
  );
}
