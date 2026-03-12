// Shared sandbox token storage
let sandboxToken = localStorage.getItem('sandboxToken') || null;

export function getToken() { return sandboxToken; }
export function setToken(t) { sandboxToken = t; localStorage.setItem('sandboxToken', t); }

function authHeaders(extra = {}) {
    return sandboxToken ? { 'X-Sandbox-Token': sandboxToken, ...extra } : extra;
}

export async function bootstrapApp() {
    const res = await fetch('/api/bootstrap', { headers: authHeaders() });
    if (!res.ok) throw new Error('Bootstrap failed');
    return res.json();
}

export async function uploadDocument(file) {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch('/api/documents/upload', {
        method: 'POST',
        body: form,
        headers: authHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Upload failed');
    return data;
}

export async function pollDocumentStatus(documentId) {
    const res = await fetch(`/api/documents/status/${documentId}`, { headers: authHeaders() });
    if (!res.ok) throw new Error('Status check failed');
    return res.json();
}

export function streamQuestion(question, onToken, onSources, onDone, onError) {
    const url = `/api/ask/stream?question=${encodeURIComponent(question)}`;
    fetch(url, { headers: authHeaders() }).then(res => {
        if (!res.ok) { res.json().then(e => onError(e.message || 'Request failed')); return; }
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        function pump() {
            reader.read().then(({ done, value }) => {
                if (done) { onDone(); return; }
                buffer += decoder.decode(value, { stream: true });
                let idx;
                while ((idx = buffer.indexOf('\n\n')) >= 0) {
                    const chunk = buffer.slice(0, idx).trim();
                    buffer = buffer.slice(idx + 2);
                    if (chunk.startsWith('data:')) {
                        const json = chunk.replace('data:', '').trim();
                        if (!json) continue;
                        try {
                            const obj = JSON.parse(json);
                            if (obj.type === 'token') onToken(obj.content);
                            if (obj.type === 'sources') onSources(obj.content);
                            if (obj.type === 'done') { onDone(); return; }
                        } catch (e) { console.error('SSE parse error', e); }
                    }
                }
                pump();
            }).catch(onError);
        }
        pump();
    }).catch(onError);
}
