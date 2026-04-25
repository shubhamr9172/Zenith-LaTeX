import React, { useState } from 'react';
import { Settings, FileCode2, Heart, Layout } from 'lucide-react';
import SettingsModal from './SettingsModal';
import { templates } from '../templates';

function Header({ apiKey, setApiKey, nvidiaApiKey, setNvidiaApiKey, setLatexCode, setOriginalCode, selectedModel, setSelectedModel, apiVersion, setApiVersion, onGoHome, view, setView, showToast, setIsSupportOpen }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleLoadTemplate = (e) => {
    const templateId = e.target.value;
    if (!templateId) return;
    
    const selected = templates.find(t => t.id === templateId);
    if (selected) {
      setLatexCode(selected.code);
      setOriginalCode(selected.code); // Clear the diff
      showToast(`${selected.name} template loaded!`);
    }
    // Reset dropdown
    e.target.value = "";
  };

  return (
    <header className="top-nav">
      <div className="nav-title" onClick={onGoHome} style={{ cursor: 'pointer' }} title="Back to Welcome Page">
        <FileCode2 size={24} color="var(--accent)" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>Zenith-LaTeX</span>
          <span className="nav-subtitle" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '400', marginTop: '-2px' }}>
            Created by Shubham Reddy
          </span>
        </div>
      </div>

      <div className="view-navigation" style={{ display: 'flex', background: 'var(--bg-input)', borderRadius: '8px', padding: '0.25rem', margin: '0 2rem' }}>
        <button 
          className={`nav-tab ${view === 'editor' ? 'active' : ''}`}
          onClick={() => setView('editor')}
          style={{
            padding: '0.4rem 1rem',
            borderRadius: '6px',
            border: 'none',
            background: view === 'editor' ? 'var(--accent)' : 'transparent',
            color: view === 'editor' ? 'white' : 'var(--text-muted)',
            fontSize: '0.85rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Editor
        </button>
        <button 
          className={`nav-tab ${view === 'analytics' ? 'active' : ''}`}
          onClick={() => setView('analytics')}
          style={{
            padding: '0.4rem 1rem',
            borderRadius: '6px',
            border: 'none',
            background: view === 'analytics' ? 'var(--accent)' : 'transparent',
            color: view === 'analytics' ? 'white' : 'var(--text-muted)',
            fontSize: '0.85rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Impact Analytics
        </button>
      </div>
      
      <div className="nav-actions">
        <div className="template-selector" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: '1rem' }}>
          <Layout size={16} color="var(--text-muted)" />
          <select 
            onChange={handleLoadTemplate} 
            defaultValue=""
            style={{ 
              background: 'var(--bg-input)', 
              color: 'var(--text-main)', 
              border: '1px solid var(--border)',
              padding: '0.4rem 0.5rem',
              borderRadius: '6px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="" disabled>Load Template...</option>
            {templates.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>

        <button 
          className="btn ghost icon-only" 
          onClick={() => setIsSupportOpen(true)}
          title="Support & Collaborate"
          style={{ color: 'var(--accent)' }}
        >
          <Heart size={20} fill="rgba(16, 185, 129, 0.2)" />
        </button>
        <button 
          className="btn ghost icon-only" 
          onClick={() => setIsSettingsOpen(true)}
          title="AI Settings"
        >
          <Settings size={20} />
        </button>
      </div>

      {isSettingsOpen && (
        <SettingsModal 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)} 
          apiKey={apiKey}
          setApiKey={setApiKey}
          nvidiaApiKey={nvidiaApiKey}
          setNvidiaApiKey={setNvidiaApiKey}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          apiVersion={apiVersion}
          setApiVersion={setApiVersion}
          showToast={showToast}
        />
      )}
    </header>
  );
}

export default Header;
