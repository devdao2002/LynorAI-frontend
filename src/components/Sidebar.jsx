import React from 'react';

const TABS = [
    {
        id: 'chat', label: 'Chat',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
        ),
    },
    {
        id: 'documents', label: 'Documents',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
            </svg>
        ),
    },
    {
        id: 'integrations', label: 'Integrations',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="7" height="7" /><rect x="15" y="3" width="7" height="7" /><rect x="2" y="14" width="7" height="7" /><path d="M17 17.5h4m-4 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm-8-3v-4m0 0L7 9m2-1l2 1" />
            </svg>
        ),
    },
    {
        id: 'settings', label: 'Settings',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
            </svg>
        ),
    },
];

export default function Sidebar({ activeTab, onTabChange }) {
    return (
        <nav className="sidebar">
            <div className="sidebar-tabs">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => onTabChange(tab.id)}
                        title={tab.label}
                    >
                        <span className="sidebar-icon">{tab.icon}</span>
                        <span className="sidebar-label">{tab.label}</span>
                    </button>
                ))}
            </div>
            <div className="sidebar-footer">
                <a href="https://github.com/devdao2002/enterprise-rag-assistant" target="_blank" rel="noreferrer" className="sidebar-link" title="GitHub">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                        <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.2 11.4c.6.1.8-.2.8-.6v-2.3c-3.3.7-4-1.4-4-1.4-.6-1.5-1.4-1.9-1.4-1.9-1.2-.8.1-.8.1-.8 1.3.1 2 .1 2 .1 1.1 1.9 3 1.3 3.7 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3 0 0 1-.3 3.3 1.2a11.4 11.4 0 016 0C17 4 18 4.3 18 4.3c.6 1.5.2 2.7.1 3 .7.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.4 5.9.4.4.8 1.1.8 2.2v3.2c0 .4.2.7.8.6A12 12 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                </a>
            </div>
        </nav>
    );
}
