import { useState } from 'react';
import { streamQuestion } from '../api/client';

export function useChat() {
    const [messages, setMessages] = useState([]);
    const [streaming, setStreaming] = useState(false);

    function sendMessage(question) {
        if (!question.trim() || streaming) return;

        const userMsg = { id: Date.now(), role: 'user', text: question };
        const botId = Date.now() + 1;
        const botMsg = { id: botId, role: 'bot', text: '', sources: [], done: false };

        setMessages(prev => [...prev, userMsg, botMsg]);
        setStreaming(true);

        streamQuestion(
            question,
            token => setMessages(prev => prev.map(m => m.id === botId ? { ...m, text: m.text + token } : m)),
            src => setMessages(prev => prev.map(m => m.id === botId ? { ...m, sources: [...m.sources, src] } : m)),
            () => { setMessages(prev => prev.map(m => m.id === botId ? { ...m, done: true } : m)); setStreaming(false); },
            err => { setMessages(prev => prev.map(m => m.id === botId ? { ...m, text: `Error: ${err}`, done: true } : m)); setStreaming(false); },
        );
    }

    function clearMessages() { setMessages([]); }

    return { messages, streaming, sendMessage, clearMessages };
}
