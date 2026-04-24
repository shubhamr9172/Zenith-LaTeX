import React, { useState } from 'react';
import { X, Key } from 'lucide-react';
import './SettingsModal.css';

function SettingsModal({ isOpen, onClose, apiKey, setApiKey }) {
  const [inputKey, setInputKey] = useState(apiKey);

  const handleSave = () => {
    setApiKey(inputKey);
    localStorage.setItem('gemini_api_key', inputKey);
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
            <label>
              <Key size={16} /> Gemini API Key
            </label>
            <input 
              type="password" 
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="AIzaSy..."
              className="api-input"
            />
            <small className="help-text">
              Your API key is stored locally in your browser. We do not store or track it.
            </small>
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
