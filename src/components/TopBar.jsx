import React from 'react';

function formatTime(s) {
    const h = Math.floor(s / 3600).toString().padStart(2, '0');
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${h}:${m}:${sec}`;
}

export default function TopBar({ sandbox, version }) {
    const active = sandbox?.active;
    const remaining = sandbox?.remainingSeconds ?? 0;

    return (
        <header className="topbar">
            <div className="topbar-left">
                <div className="topbar-logo">
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                        <rect width="32" height="32" rx="8" fill="url(#logoGrad)" />
                        <path d="M8 22L16 10L24 22H8Z" fill="white" opacity="0.9" />
                        <defs>
                            <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#6264A7" />
                                <stop offset="1" stopColor="#9EA8DB" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <span className="topbar-title">LynorAI Copilot</span>
                </div>
            </div>

            <div className="topbar-center">
                <span className="topbar-subtitle">Enterprise RAG Assistant</span>
            </div>

            <div className="topbar-right">
                {version?.version && (
                    <span className="version-badge">v{version.version}</span>
                )}
                <div className={`sandbox-badge ${active ? 'active' : 'expired'}`}>
                    <span className="badge-dot" />
                    {active ? (
                        <span>Sandbox&nbsp;<strong>{formatTime(remaining)}</strong></span>
                    ) : (
                        <span>Session Expired</span>
                    )}
                </div>
                <div className="avatar">AI</div>
            </div>
        </header>
    );
}
