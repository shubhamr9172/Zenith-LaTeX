import React, { useState } from 'react';
import { X, Key, ExternalLink } from 'lucide-react';
import './SettingsModal.css';

function SettingsModal({ isOpen, onClose, apiKey, setApiKey, nvidiaApiKey, setNvidiaApiKey, selectedModel, setSelectedModel, apiVersion, setApiVersion, showToast }) {
  const [inputKey, setInputKey] = useState(apiKey);
  const [inputNvidiaKey, setInputNvidiaKey] = useState(nvidiaApiKey);
  const [inputModel, setInputModel] = useState(selectedModel);
  const [inputVersion, setInputVersion] = useState(apiVersion);

  const handleSave = () => {
    setApiKey(inputKey);
    setNvidiaApiKey(inputNvidiaKey);
    setSelectedModel(inputModel);
    setApiVersion(inputVersion);
    localStorage.setItem('gemini_api_key', inputKey);
    localStorage.setItem('nvidia_api_key', inputNvidiaKey);
    localStorage.setItem('selectedModel', inputModel);
    localStorage.setItem('apiVersion', inputVersion);
    if (showToast) showToast('Settings saved successfully!');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Settings</h3>
          <button className="btn ghost icon-only" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="form-group">
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span><Key size={16} /> Gemini API Key (Google)</span>
              <a href="https://aistudio.google.com/app/api-keys" target="_blank" rel="noopener noreferrer" className="link-text">
                Get Key <ExternalLink size={12} />
              </a>
            </label>
            <input 
              type="password" 
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="AIzaSy..."
              className="api-input"
            />
          </div>

          <div className="form-group" style={{ marginTop: '1.5rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span><Key size={16} /> NVIDIA API Key (Turbo Mode)</span>
              <a href="https://build.nvidia.com/google/gemma-2-2b-it/modelcard" target="_blank" rel="noopener noreferrer" className="link-text">
                Get Key <ExternalLink size={12} />
              </a>
            </label>
            <input 
              type="password" 
              value={inputNvidiaKey}
              onChange={(e) => setInputNvidiaKey(e.target.value)}
              placeholder="nvapi-..."
              className="api-input"
            />
            <small className="help-text">
              Required for Gemma 2 Turbo Mode.
            </small>
          </div>

          <div className="form-group" style={{ marginTop: '1.5rem' }}>
            <label>AI Model</label>
            <select 
              className="api-input" 
              value={inputModel} 
              onChange={(e) => setInputModel(e.target.value)}
              style={{ padding: '0.75rem' }}
            >
              <optgroup label="Google Gemini (Stable)">
                <option value="gemini-2.5-pro">Gemini 2.5 Pro (Advanced)</option>
                <option value="gemini-2.5-flash">Gemini 2.5 Flash (Balanced)</option>
              </optgroup>
              <optgroup label="Google Gemini (Preview)">
                <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro (Next Gen)</option>
                <option value="gemini-3.1-flash-preview">Gemini 3.1 Flash (Fastest)</option>
              </optgroup>
              <optgroup label="NVIDIA (Turbo Mode)">
                <option value="google/gemma-2-2b-it">Gemma 2 2B (Lightning Fast)</option>
              </optgroup>
            </select>
          </div>

          <div className="form-group" style={{ marginTop: '1.5rem' }}>
            <label>API Version (Google Only)</label>
            <select 
              className="api-input" 
              value={inputVersion} 
              onChange={(e) => setInputVersion(e.target.value)}
              style={{ padding: '0.75rem' }}
            >
              <option value="v1beta">v1beta (Recommended)</option>
              <option value="v1">v1 (Stable)</option>
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn secondary" onClick={onClose}>Cancel</button>
          <button className="btn" onClick={handleSave}>Save Settings</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
