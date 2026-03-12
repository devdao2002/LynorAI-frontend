import React from 'react';

export default function SettingsPane({ sandbox, version, limits }) {
    return (
        <div className="pane settings-pane">
            <div className="pane-header">
                <h2>Settings & Info</h2>
                <span className="pane-subtitle">Sandbox details, rate limits, and version information</span>
            </div>

            {/* Sandbox */}
            <div className="settings-card">
                <h3>🔑 Sandbox Session</h3>
                <div className="settings-row">
                    <span className="settings-label">Token</span>
                    <code className="settings-value token-value">{sandbox?.token || '—'}</code>
                </div>
                <div className="settings-row">
                    <span className="settings-label">Status</span>
                    <span className={`status-chip ${sandbox?.active ? 'active' : 'expired'}`}>
                        {sandbox?.active ? 'Active' : 'Expired'}
                    </span>
                </div>
                <div className="settings-row">
                    <span className="settings-label">Expires in</span>
                    <span className="settings-value">{sandbox?.remainingSeconds ?? '—'}s</span>
                </div>
            </div>

            {/* Rate limits */}
            <div className="settings-card">
                <h3>⚡ Rate Limits</h3>
                <div className="settings-row"><span className="settings-label">Uploads / 10 min</span><span className="settings-value">2</span></div>
                <div className="settings-row"><span className="settings-label">Queries / 10 min</span><span className="settings-value">20</span></div>
                <div className="settings-row"><span className="settings-label">Max file size</span><span className="settings-value">5 MB</span></div>
            </div>

            {/* Cleanup */}
            <div className="settings-card">
                <h3>🧹 Auto-Cleanup</h3>
                <p className="settings-text">Documents and sandbox sessions are automatically deleted after <strong>4 hours</strong>. Do not upload sensitive or confidential data.</p>
            </div>

            {/* Version */}
            <div className="settings-card">
                <h3>📦 Version</h3>
                <div className="settings-row"><span className="settings-label">App Version</span><span className="settings-value">{version?.version || '—'}</span></div>
                <div className="settings-row"><span className="settings-label">Commit</span>
                    {version?.commitUrl ? (
                        <a href={version.commitUrl} target="_blank" rel="noreferrer" className="settings-link">{version.commitShort || '—'}</a>
                    ) : <span className="settings-value">{version?.commitShort || '—'}</span>}
                </div>
            </div>

            {/* Stack */}
            <div className="settings-card">
                <h3>🛠 Tech Stack</h3>
                <div className="tech-chips">
                    {['Spring Boot', 'Spring AI', 'OpenAI GPT', 'pgvector', 'React', 'Vite'].map(t => (
                        <span key={t} className="tech-chip">{t}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}
