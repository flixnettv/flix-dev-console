import { useState } from 'react';

const quickPrompts = {
  ar: ['تحسين الأمر', 'شرح الخطأ', 'سكريبت نشر مجاني', 'تحويل وصف إلى Bash'],
  en: ['Improve command', 'Explain error', 'Free deploy script', 'Convert brief to Bash']
};

const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787';

export default function ChatWindow({ t, language, provider, model, localMode, userId }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: `${t.statusReady} · ${provider} / ${model}` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const onSend = async (event) => {
    event.preventDefault();
    const clean = input.trim();
    if (!clean) return;

    setMessages((prev) => [...prev, { role: 'user', text: clean }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${apiBase}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: clean,
          provider,
          model,
          localMode,
          userId: userId || 'anonymous'
        })
      });

      const data = await response.json();
      const reply = data.output || t.demoReply;
      const meta = data.persisted ? '✓ DB' : `⚠ ${data.persistenceMessage || 'No DB'}`;
      setMessages((prev) => [...prev, { role: 'assistant', text: `${reply} (${meta})` }]);
    } catch (_error) {
      setMessages((prev) => [...prev, { role: 'assistant', text: t.networkError }]);
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
        <span>{t.quick}</span>
        {quickPrompts[language].map((prompt) => (
          <button type="button" key={prompt} onClick={() => setInput(prompt)}>
            {prompt}
          </button>
        ))}
      </div>

      <form onSubmit={onSend} className="composer">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={t.chatPlaceholder} />
        <button type="submit">{t.send}</button>
      </form>
    </section>
  );
}
