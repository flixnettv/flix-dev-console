import { useMemo, useState } from 'react';
import ChatWindow from './components/ChatWindow';
import { translations } from './i18n/translations';

const providers = {
  'Open Code': ['open-code-lite', 'open-code-proxy'],
  'Google Gemini': ['gemini-1.5-flash', 'gemini-2.0-flash-exp'],
  openclaw: ['openclaw-chat', 'openclaw-coder'],
  'Open Source': ['Qwen2.5-Coder-7B-Instruct', 'Llama-3.1-8B-Instruct']
};

export default function App() {
  const [language, setLanguage] = useState('ar');
  const [theme, setTheme] = useState('dark');
  const [provider, setProvider] = useState('Open Source');
  const [model, setModel] = useState(providers['Open Source'][0]);
  const [localMode, setLocalMode] = useState(true);
  const [connected, setConnected] = useState(false);

  const t = translations[language];

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  const providerModels = useMemo(() => providers[provider] ?? [], [provider]);

  const handleProviderChange = (nextProvider) => {
    setProvider(nextProvider);
    setModel(providers[nextProvider][0]);
  };

  const connectProvider = () => {
    localStorage.setItem(
      'flixcod-provider',
      JSON.stringify({ provider, model, localMode, at: new Date().toISOString() })
    );
    setConnected(true);
    setTimeout(() => setConnected(false), 1800);
  };

  return (
    <main className={`app ${theme}`} dir={dir}>
      <header className="topbar">
        <div>
          <h1>{t.appTitle}</h1>
          <p>{t.appTagline}</p>
        </div>
        <div className="controls">
          <label>
            {t.lang}
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </label>
          <label>
            {t.theme}
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="dark">{t.dark}</option>
              <option value="light">{t.light}</option>
            </select>
          </label>
        </div>
      </header>

      <section className="bridge-box">
        <h2>{t.loginHint}</h2>
        <div className="grid">
          <label>
            {t.provider}
            <select value={provider} onChange={(e) => handleProviderChange(e.target.value)}>
              {Object.keys(providers).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            {t.model}
            <select value={model} onChange={(e) => setModel(e.target.value)}>
              {providerModels.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={localMode}
              onChange={(e) => setLocalMode(e.target.checked)}
            />
            <span>
              {t.localMode}
              <small>{t.localModeDesc}</small>
            </span>
          </label>

          <button type="button" className="connect" onClick={connectProvider}>
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
      />
    </main>
  );
}
