import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8787';

const quickPrompts = {
  ar: ['حسن الصفحة الرئيسية.', 'اكتب إعلان جذاب.', 'أنشئ خطة إطلاق سريعة.'],
  en: ['Improve landing copy.', 'Write a catchy ad.', 'Build a quick launch plan.']
};

export default function ChatWindow({ t, language, provider, model, localMode, user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const baseMessage = user ? `${t.statusReady} · ${provider} / ${model}` : t.requiredToUseTools;
    setMessages([{ role: 'assistant', text: baseMessage }]);
  }, [t, provider, model, user]);

  const onSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !user) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': user.id
        },
        body: JSON.stringify({ message: userText, provider, model, localMode })
      });

      if (!response.ok) throw new Error('chat_request_failed');

      const data = await response.json();
      const runtimeHint = localMode
        ? language === 'ar'
          ? 'تشغيل محلي.'
          : 'Local mode.'
        : language === 'ar'
          ? 'تشغيل سحابي.'
          : 'Cloud mode.';

      setMessages((prev) => [...prev, { role: 'assistant', text: `${t.demoReply} ${runtimeHint} ${data.output}` }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: t.registerError }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="chat-shell">
      <div className="messages">
        {messages.map((message, index) => (
          <article key={`${message.role}-${index}`} className={`msg ${message.role}`}>
            <strong>{message.role === 'user' ? 'You' : 'FlixCod'}</strong>
            <p>{message.text}</p>
          </article>
        ))}
        {loading ? <p className="status">{t.statusProcessing}</p> : null}
      </div>

      <div className="quick-prompts">
        {quickPrompts[language].map((prompt) => (
          <button type="button" key={prompt} onClick={() => setInput(prompt)} disabled={!user}>
            {prompt}
          </button>
        ))}
      </div>

      <form onSubmit={onSend} className="composer">
        <button type="button" className="icon-btn" disabled>
          +
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={user ? t.chatPlaceholder : t.requiredToUseTools}
          disabled={!user}
        />
        <button type="button" className="icon-btn" disabled>
          🎤
        </button>
        <button type="submit" className="send-btn" disabled={!user || loading}>
          ↑
        </button>
      </form>
    </section>
  );
}
