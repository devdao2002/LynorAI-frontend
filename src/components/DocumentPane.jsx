import React, { useRef, useState } from 'react';

const STATUS_ICON = {
    uploading: '⏫',
    processing: '⚙️',
    ready: '✅',
    failed: '❌',
};
const STATUS_LABEL = {
    uploading: 'Uploading…',
    processing: 'Processing…',
    ready: 'Ready',
    failed: 'Failed',
};

export default function DocumentPane({ uploads, onUpload, sandboxActive }) {
    const inputRef = useRef(null);
    const [dragging, setDragging] = useState(false);

    function handleFiles(files) {
        const pdf = Array.from(files).find(f => f.type === 'application/pdf' || f.name.endsWith('.pdf'));
        if (pdf) onUpload(pdf);
    }

    function onDrop(e) {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
    }

    return (
        <div className="pane doc-pane">
            <div className="pane-header">
                <h2>Documents</h2>
                <span className="pane-subtitle">Upload PDF documents to power your AI assistant</span>
            </div>

            {/* Drop zone */}
            <div
                className={`drop-zone ${dragging ? 'dragging' : ''} ${!sandboxActive ? 'disabled' : ''}`}
                onClick={() => sandboxActive && inputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
            >
                <div className="drop-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="40" height="40">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                </div>
                <p className="drop-label">
                    {sandboxActive ? 'Drag & drop a PDF here, or click to browse' : 'Session expired — cannot upload'}
                </p>
                <span className="drop-hint">PDF only · Max 5 MB</span>
                <input ref={inputRef} type="file" accept="application/pdf" style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />
            </div>

            {/* Upload list */}
            {uploads.length > 0 && (
                <div className="upload-list">
                    <h3 className="upload-list-title">Uploaded Files</h3>
                    {uploads.map(u => (
                        <div key={u.id} className={`upload-item ${u.status}`}>
                            <div className="upload-item-left">
                                <span className="upload-status-icon">{STATUS_ICON[u.status]}</span>
                                <div>
                                    <div className="upload-name">{u.name}</div>
                                    {u.error && <div className="upload-error">{u.error}</div>}
                                </div>
                            </div>
                            <span className={`upload-badge ${u.status}`}>{STATUS_LABEL[u.status]}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Limits */}
            <div className="limits-card">
                <h3>Demo Limits</h3>
                <ul>
                    <li>📤 2 uploads / 10 min per IP</li>
                    <li>💬 20 queries / 10 min per IP</li>
                    <li>📁 Max file size: 5 MB</li>
                    <li>⏱ Documents auto-deleted after 4 hours</li>
                    <li>🔒 Do NOT upload sensitive data</li>
                </ul>
            </div>
        </div>
    );
}
