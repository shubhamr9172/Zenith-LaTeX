import React, { useState } from 'react';
import { Editor, DiffEditor } from '@monaco-editor/react';
import { Copy, Check, Columns, LayoutList, CheckCircle2, Play, Loader2, Download } from 'lucide-react';
import './CodeViewer.css';

function CodeViewer({ latexCode, setLatexCode, originalCode, setOriginalCode }) {
  const [copied, setCopied] = useState(false);
  const [isSideBySide, setIsSideBySide] = useState(true);
  const [activeTab, setActiveTab] = useState('code'); // 'code' or 'pdf'
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileError, setCompileError] = useState(null);

  const hasChanges = originalCode !== latexCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(latexCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAcceptChanges = () => {
    setOriginalCode(latexCode);
  };

  const handleEditorChange = (value) => {
    setLatexCode(value || '');
  };

  const compilePdf = () => {
    setIsCompiling(true);
    setCompileError(null);
    
    // Instead of using fetch (which gets blocked by CORS), we use a hidden HTML form
    // to POST directly to the server, and set its target to our iframe.
    setTimeout(() => {
      const form = document.getElementById('latex-form');
      if (form) {
        form.submit();
      }
      
      // We can't know exactly when the iframe finishes loading because of cross-origin security,
      // but we can assume it takes a few seconds and hide the spinner.
      setTimeout(() => setIsCompiling(false), 3000);
      setPdfUrl('loading'); // Just a flag to show the iframe
    }, 100);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'pdf' && !pdfUrl) {
      compilePdf();
    }
  };

  return (
    <div className="code-viewer-container">
      <div className="code-header">
        <div className="tabs">
          <div 
            className={`tab ${activeTab === 'code' ? 'active' : ''}`} 
            onClick={() => setActiveTab('code')}
          >
            resume.tex 
            {hasChanges && <span className="dirty-dot" title="Unaccepted AI Changes" />}
          </div>
          <div 
            className={`tab ${activeTab === 'pdf' ? 'active' : ''}`} 
            onClick={() => handleTabClick('pdf')}
          >
            Preview PDF
          </div>
        </div>
        <div className="actions">
          {activeTab === 'code' ? (
            <>
              {hasChanges && (
                <>
                  <button 
                    className="btn ghost icon-only" 
                    onClick={() => setIsSideBySide(!isSideBySide)}
                    title={isSideBySide ? "Switch to Inline Diff" : "Switch to Side-by-Side Diff"}
                  >
                    {isSideBySide ? <LayoutList size={18} /> : <Columns size={18} />}
                  </button>
                  <button className="btn success icon-text" onClick={handleAcceptChanges}>
                    <CheckCircle2 size={16} /> Accept Changes
                  </button>
                  <div className="divider" />
                </>
              )}
              <button className="btn ghost icon-text" onClick={compilePdf} disabled={isCompiling}>
                {isCompiling ? <Loader2 size={16} className="spinner" /> : <Play size={16} />}
                Compile
              </button>
              <button className="btn secondary icon-text" onClick={handleCopy}>
                {copied ? <Check size={16} color="var(--success)" /> : <Copy size={16} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </>
          ) : (
            <>
              <button className="btn secondary icon-text" onClick={() => document.getElementById('download-form')?.submit()} disabled={isCompiling}>
                <Download size={16} /> Download PDF
              </button>
              <button className="btn ghost icon-text" onClick={compilePdf} disabled={isCompiling}>
                {isCompiling ? <Loader2 size={16} className="spinner" /> : <Play size={16} />}
                Recompile
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="code-content">
        <div style={{ display: activeTab === 'code' ? 'block' : 'none', width: '100%', height: '100%' }}>
          {hasChanges ? (
            <DiffEditor
              height="100%"
              language="latex"
              theme="vs-dark"
              original={originalCode}
              modified={latexCode}
              onMount={(editor) => {
                editor.getModifiedEditor().onDidChangeModelContent(() => {
                  setLatexCode(editor.getModifiedEditor().getValue());
                });
              }}
              options={{
                renderSideBySide: isSideBySide,
                minimap: { enabled: false },
                wordWrap: 'on',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                ignoreTrimWhitespace: false,
              }}
            />
          ) : (
            <Editor
              height="100%"
              language="latex"
              theme="vs-dark"
              value={latexCode}
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                wordWrap: 'on',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
              }}
            />
          )}
        </div>

          <div className="pdf-preview-container" style={{ display: activeTab === 'pdf' ? 'flex' : 'none', position: 'relative' }}>
          {/* Hidden forms for cross-origin POST */}
          <form 
            id="latex-form" 
            target="pdf-frame" 
            action="https://texlive.net/cgi-bin/latexcgi" 
            method="POST" 
            encType="multipart/form-data" 
            style={{ display: 'none' }}
          >
            <textarea name="filecontents[]" value={latexCode.replace(/\r?\n/g, '\r\n')} readOnly />
            <input type="hidden" name="filename[]" value="document.tex" />
            <input type="hidden" name="engine" value="pdflatex" />
            <input type="hidden" name="return" value="pdf" />
          </form>

          <form 
            id="download-form" 
            target="_blank" 
            action="https://texlive.net/cgi-bin/latexcgi" 
            method="POST" 
            encType="multipart/form-data" 
            style={{ display: 'none' }}
          >
            <textarea name="filecontents[]" value={latexCode.replace(/\r?\n/g, '\r\n')} readOnly />
            <input type="hidden" name="filename[]" value="document.tex" />
            <input type="hidden" name="engine" value="pdflatex" />
            <input type="hidden" name="return" value="pdf" />
          </form>

          {isCompiling && (
            <div className="pdf-loading" style={{ position: 'absolute', zIndex: 10, background: 'rgba(82, 86, 89, 0.9)' }}>
              <Loader2 size={48} className="spinner" />
              <p>Compiling LaTeX via TeXLive.net...</p>
            </div>
          )}

          {pdfUrl ? (
            <iframe name="pdf-frame" className="pdf-frame" title="PDF Preview" />
          ) : (
            <div className="pdf-loading">
              <p>Click "Compile" to generate PDF.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CodeViewer;
