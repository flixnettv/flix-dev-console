import { useState } from 'react';

const quickPrompts = {
  ar: [
    'تحسين صياغة الأمر',
    'شرح خطأ الطرفية',
    'اقتراح سكربت للنشر المجاني',
    'تحويل نص عربي إلى أوامر Bash'
  ],
  en: [
    'Improve this command prompt',
    'Explain terminal error',
    'Suggest free deploy script',
    'Convert plain text to Bash'
  ]
};

export default function ChatWindow({ t, language, provider, model, localMode }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: `${t.statusReady} · ${provider} / ${model}` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const pushPrompt = (prompt) => {
    setInput(prompt);
  };

  const onSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const runtimeHint = localMode
        ? language === 'ar'
          ? 'تمت المعالجة عبر نمط الجهاز المحلي.'
          : 'Processed in local-device mode.'
        : language === 'ar'
          ? 'تمت المحاكاة عبر وضع السحابة.'
          : 'Simulated through cloud mode.';

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: `${t.demoReply} ${runtimeHint}` }
      ]);
      setLoading(false);
    }, 650);
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
          <button type="button" key={prompt} onClick={() => pushPrompt(prompt)}>
            {prompt}
          </button>
        ))}
      </div>

      <form onSubmit={onSend} className="composer">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.chatPlaceholder}
        />
        <button type="submit">{t.send}</button>
      </form>
    </section>
  );
}
