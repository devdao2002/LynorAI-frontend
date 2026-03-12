import React, { useState } from 'react';

const INTEGRATIONS = [
    {
        id: 'teams',
        name: 'Microsoft Teams',
        icon: '🟦',
        color: '#6264A7',
        description: 'Deploy your Copilot as a Teams bot. Users can chat with it directly inside Teams channels or 1:1.',
        badge: 'Bot Framework',
        steps: [
            'Register your app in the Azure Portal as an Azure Bot resource.',
            'Add the Microsoft Teams channel in the Bot configuration.',
            'Upload the Teams app manifest via Teams Developer Portal.',
            'Users install the app from the Teams App Store or sideload it.',
        ],
        code: `// teams-manifest.json (excerpt)
{
  "bots": [{
    "botId": "<YOUR_BOT_ID>",
    "scopes": ["personal","team","groupChat"],
    "commandLists": [{"scopes":["personal"],"commands":[
      {"title":"Ask","description":"Ask a question"}
    ]}]
  }]
}`,
    },
    {
        id: 'powerapps',
        name: 'Power Apps',
        icon: '🟪',
        color: '#742774',
        description: 'Embed this assistant inside a Power Apps canvas app using the Power Apps component framework.',
        badge: 'PCF Component',
        steps: [
            'Build a PCF (Power Apps Component Framework) control.',
            'Wrap the web chat iframe in a code component.',
            'Import the solution into your Power Platform environment.',
            'Add the component to any canvas or model-driven app.',
        ],
        code: `<!-- Power Apps Web Resource iframe -->
<iframe
  src="https://your-rag-domain.com"
  width="100%"
  height="600"
  frameborder="0"
  allow="microphone"
  title="LynorAI Copilot">
</iframe>`,
    },
    {
        id: 'webchat',
        name: 'Web Chat',
        icon: '🌐',
        color: '#0078D4',
        description: 'Embed the chatbot on any website or internal portal using a simple iframe or Direct Line token.',
        badge: 'Embed Code',
        steps: [
            'Copy the embed snippet below.',
            'Paste it into your website HTML where you want the chat widget.',
            'Optionally pass an auth token via URL param or postMessage.',
            'Style the iframe to match your site design.',
        ],
        code: `<!-- Web Chat Embed Snippet -->
<iframe
  id="lynor-copilot"
  src="http://localhost:3000"
  style="position:fixed;bottom:24px;right:24px;
         width:380px;height:560px;border:none;
         border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,.3);
         z-index:9999;"
  title="LynorAI Copilot">
</iframe>`,
    },
];

function IntegrationCard({ integration }) {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    function copy() {
        navigator.clipboard.writeText(integration.code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }

    return (
        <div className="integration-card" style={{ '--accent': integration.color }}>
            <div className="integration-header" onClick={() => setOpen(o => !o)}>
                <div className="integration-title-row">
                    <span className="integration-icon">{integration.icon}</span>
                    <div>
                        <div className="integration-name">{integration.name}</div>
                        <span className="integration-badge">{integration.badge}</span>
                    </div>
                </div>
                <span className={`chevron ${open ? 'open' : ''}`}>▾</span>
            </div>

            <p className="integration-desc">{integration.description}</p>

            {open && (
                <div className="integration-body">
                    <h4>Setup Steps</h4>
                    <ol className="setup-steps">
                        {integration.steps.map((s, i) => <li key={i}>{s}</li>)}
                    </ol>
                    <div className="code-block-wrap">
                        <div className="code-block-header">
                            <span>Snippet</span>
                            <button className="copy-btn" onClick={copy}>{copied ? '✅ Copied' : '📋 Copy'}</button>
                        </div>
                        <pre className="code-block"><code>{integration.code}</code></pre>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function IntegrationPane() {
    return (
        <div className="pane integration-pane">
            <div className="pane-header">
                <h2>Integrations</h2>
                <span className="pane-subtitle">Connect your Copilot to Microsoft Teams, Power Apps, and the web</span>
            </div>
            <div className="integration-grid">
                {INTEGRATIONS.map(int => <IntegrationCard key={int.id} integration={int} />)}
            </div>
        </div>
    );
}
