import React, { useState, useRef, useEffect } from 'react';

function Message({ msg }) {
    const isBot = msg.role === 'bot';
    return (
        <div className={`message-row ${isBot ? 'bot' : 'user'}`}>
            {isBot && (
                <div className="msg-avatar bot-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <circle cx="12" cy="12" r="10" /><path d="M8 12h8M12 8v8" />
                    </svg>
                </div>
            )}
            <div className={`message-bubble ${isBot ? 'bot-bubble' : 'user-bubble'}`}>
                {msg.text ? (
                    <p className="message-text">{msg.text}</p>
                ) : (
                    <span className="typing-dots"><span /><span /><span /></span>
                )}
                {msg.sources && msg.sources.length > 0 && (
                    <div className="source-pills">
                        {msg.sources.map((s, i) => (
                            <span key={i} className="source-pill">📄 {s}</span>
                        ))}
                    </div>
                )}
            </div>
            {!isBot && <div className="msg-avatar user-avatar">You</div>}
        </div>
    );
}

export default function ChatPane({ messages, streaming, onSend, sandboxActive, documentReady }) {
    const [input, setInput] = useState('');
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    function handleSend() {
        if (!input.trim()) return;
        onSend(input.trim());
        setInput('');
    }

    function handleKey(e) {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    }

    const canSend = sandboxActive && documentReady && !streaming;

    return (
        <div className="pane chat-pane">
            <div className="pane-header">
                <h2>Chat</h2>
                <span className="pane-subtitle">Ask questions about your uploaded documents</span>
            </div>

            <div className="chat-history">
                {messages.length === 0 && (
                    <div className="chat-empty">
                        <div className="chat-empty-icon">💬</div>
                        <p>Upload a document, then ask me anything about it.</p>
                    </div>
                )}
                {messages.map(m => <Message key={m.id} msg={m} />)}
                <div ref={bottomRef} />
            </div>

            {!documentReady && sandboxActive && (
                <div className="chat-notice">📄 Upload a document in the Documents tab to start chatting.</div>
            )}

            <div className="chat-input-row">
                <textarea
                    className="chat-input"
                    placeholder={canSend ? 'Ask a question about your documents…' : 'Upload a document to start…'}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    disabled={!canSend}
                    rows={2}
                />
                <button className="send-btn" onClick={handleSend} disabled={!canSend || !input.trim()}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
