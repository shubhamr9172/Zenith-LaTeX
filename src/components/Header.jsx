import React, { useState } from 'react';
import { Settings, FileCode2, FileDown } from 'lucide-react';
import SettingsModal from './SettingsModal';
import { templates } from '../templates';

function Header({ apiKey, setApiKey, setLatexCode, setOriginalCode }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleLoadTemplate = (e) => {
    const templateId = e.target.value;
    if (!templateId) return;
    
    if (confirm("Are you sure you want to load a new template? This will replace your current code!")) {
      const selected = templates.find(t => t.id === templateId);
      if (selected) {
        setLatexCode(selected.code);
        setOriginalCode(selected.code); // Clear the diff
      }
    }
    // Reset dropdown
    e.target.value = "";
  };

  return (
    <header className="top-nav">
      <div className="nav-title">
        <FileCode2 size={24} color="var(--accent)" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>Zenith-LaTeX</span>
          <span className="nav-subtitle" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '400', marginTop: '-2px' }}>
            Created by Shubham Reddy
          </span>
        </div>
      </div>
      
      <div className="nav-actions">
        <div className="template-selector" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: '1rem' }}>
          <FileDown size={16} color="var(--text-muted)" />
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
          onClick={() => setIsSettingsOpen(true)}
          title="Settings (API Key)"
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
        />
      )}
    </header>
  );
}

export default Header;
