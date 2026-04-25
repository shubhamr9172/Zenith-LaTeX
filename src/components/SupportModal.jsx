import React, { useState } from 'react';
import { Heart, Code2, X, Coffee, Link, Scan } from 'lucide-react';
import './SupportModal.css';

function SupportModal({ isOpen, onClose }) {
  const [showQR, setShowQR] = useState(false);
  // Using the public path - save your image in the 'public' folder!
  const qrCodePath = "/payment-qr.png"; 

  if (!isOpen) return null;

  return (
    <div className="support-modal-overlay">
      <div className={`support-modal-content animate-in ${showQR ? 'expanded' : ''}`}>
        <button className="support-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="support-header">
          <div className="heart-icon-wrapper">
            <Heart className="heart-icon" fill="var(--accent)" />
          </div>
          <h2>Support Zenith-LaTeX</h2>
          <p>If this tool helped you architect your future, consider supporting its growth or collaborating on GitHub.</p>
        </div>

        <div className="support-options">
          <a 
            href="https://github.com/shubhamr9172/Zenith-LaTeX" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="support-card"
          >
            <div className="card-icon">
              <Code2 size={24} />
            </div>
            <div className="card-info">
              <h3>Collaborate</h3>
              <p>Contribute to the source code on GitHub.</p>
            </div>
          </a>

          <div 
            className={`support-card donate ${showQR ? 'active' : ''}`}
            onClick={() => setShowQR(!showQR)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-icon">
              {showQR ? <Scan size={24} /> : <Coffee size={24} />}
            </div>
            <div className="card-info">
              <h3>{showQR ? 'Scan to Support' : 'Support the Project'}</h3>
              <p>{showQR ? 'Open any UPI app to scan.' : 'Help keep the AI engines running.'}</p>
            </div>
          </div>

          {showQR && (
            <div className="qr-reveal-area animate-in">
              <div className="qr-frame">
                <img 
                  src={qrCodePath} 
                  alt="Payment QR Code" 
                  className="qr-image" 
                  onError={(e) => {
                    e.target.src = "https://placehold.co/200x200/10B981/FFFFFF?text=Scan+to+Support";
                  }}
                />
              </div>
              <div className="upi-id">
                <span>UPI ID: <strong>shubhamreddy9172@oksbi</strong></span>
              </div>
            </div>
          )}
        </div>

        <div className="support-footer">
          <p>Dismissing this will save your preference. We won't ask again.</p>
          <button className="btn-dismiss" onClick={onClose}>Maybe Later</button>
        </div>
      </div>
    </div>
  );
}

export default SupportModal;
