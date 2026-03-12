import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import ChatPane from './components/ChatPane';
import DocumentPane from './components/DocumentPane';
import IntegrationPane from './components/IntegrationPane';
import SettingsPane from './components/SettingsPane';
import { useBootstrap } from './hooks/useBootstrap';
import { useChat } from './hooks/useChat';
import { useDocuments } from './hooks/useDocuments';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const bootstrap = useBootstrap();
  const chat = useChat();
  const docs = useDocuments(() => bootstrap.setDocumentReady(true));

  if (bootstrap.loading) {
    return (
      <div className="splash">
        <div className="splash-spinner" />
        <p>Connecting to LynorAI…</p>
      </div>
    );
  }

  if (bootstrap.error) {
    return (
      <div className="splash error">
        <p>⚠️ {bootstrap.error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <TopBar sandbox={bootstrap.sandbox} version={bootstrap.version} />
      <div className="app-body">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="main-content">
          {activeTab === 'chat' && (
            <ChatPane
              messages={chat.messages}
              streaming={chat.streaming}
              onSend={chat.sendMessage}
              sandboxActive={bootstrap.sandbox?.active}
              documentReady={bootstrap.documentReady}
            />
          )}
          {activeTab === 'documents' && (
            <DocumentPane
              uploads={docs.uploads}
              onUpload={docs.upload}
              sandboxActive={bootstrap.sandbox?.active}
            />
          )}
          {activeTab === 'integrations' && <IntegrationPane />}
          {activeTab === 'settings' && (
            <SettingsPane
              sandbox={bootstrap.sandbox}
              version={bootstrap.version}
              limits={bootstrap.limits}
            />
          )}
        </main>
      </div>
    </div>
  );
}
