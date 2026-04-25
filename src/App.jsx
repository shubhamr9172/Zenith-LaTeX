import React, { useState } from 'react';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import CodeViewer from './components/CodeViewer';
import LandingPage from './components/LandingPage';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import SupportModal from './components/SupportModal';
import { Sparkles } from 'lucide-react';

function App() {
  const defaultLatex = '% Paste your LaTeX resume code here...\n\n\\documentclass{article}\n\\begin{document}\n\n\\end{document}';
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [nvidiaApiKey, setNvidiaApiKey] = useState(() => localStorage.getItem('nvidia_api_key') || '');
  const [latexCode, setLatexCode] = useState(() => localStorage.getItem('latexCode') || defaultLatex);
  const [originalCode, setOriginalCode] = useState(() => localStorage.getItem('originalCode') || localStorage.getItem('latexCode') || defaultLatex);
  const [sidebarWidth, setSidebarWidth] = useState(450);
  const [selectedModel, setSelectedModel] = useState(() => localStorage.getItem('selectedModel') || 'gemini-2.5-flash');
  const [apiVersion, setApiVersion] = useState(() => localStorage.getItem('apiVersion') || 'v1beta');
  const [isResizing, setIsResizing] = useState(false);
  const [view, setView] = useState(() => localStorage.getItem('view') || 'landing');
  const [targetJD, setTargetJD] = useState(() => localStorage.getItem('targetJD') || '');
  const [toast, setToast] = useState(null);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  React.useEffect(() => {
    // Show support modal after 60 seconds, only if not dismissed before
    const isDismissed = localStorage.getItem('zenith_support_dismissed');
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsSupportOpen(true);
      }, 60000); // 1 minute delay
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseSupport = () => {
    setIsSupportOpen(false);
    localStorage.setItem('zenith_support_dismissed', 'true');
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const startResizing = React.useCallback((e) => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback((e) => {
    if (isResizing) {
      const newWidth = e.clientX;
      if (newWidth > 300 && newWidth < 800) {
        setSidebarWidth(newWidth);
      }
    }
  }, [isResizing]);

  React.useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  React.useEffect(() => {
    localStorage.setItem('latexCode', latexCode);
  }, [latexCode]);

  React.useEffect(() => {
    localStorage.setItem('targetJD', targetJD);
  }, [targetJD]);

  React.useEffect(() => {
    localStorage.setItem('view', view);
    if (view === 'landing' || view === 'analytics') {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
      document.documentElement.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.documentElement.style.overflow = 'hidden';
    }
  }, [view]);

  if (view === 'landing') {
    return <LandingPage onStart={() => setView('editor')} />;
  }

  return (
    <div className="app-layout" style={{ userSelect: isResizing ? 'none' : 'auto' }}>
      <Header 
        apiKey={apiKey} 
        setApiKey={setApiKey} 
        nvidiaApiKey={nvidiaApiKey}
        setNvidiaApiKey={setNvidiaApiKey}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        apiVersion={apiVersion}
        setApiVersion={setApiVersion}
        setLatexCode={setLatexCode}
        setOriginalCode={setOriginalCode}
        onGoHome={() => setView('landing')}
        view={view}
        setView={setView}
        showToast={showToast}
        setIsSupportOpen={setIsSupportOpen}
      />
      
      <div className="workspace">
        {view === 'analytics' ? (
          <AnalyticsDashboard 
            latexCode={latexCode} 
            setLatexCode={setLatexCode}
            targetJD={targetJD} 
            setTargetJD={setTargetJD} 
            showToast={showToast}
          />
        ) : (
          <>
            <aside className="sidebar" style={{ width: `${sidebarWidth}px` }}>
              <ChatInterface 
                apiKey={apiKey} 
                nvidiaApiKey={nvidiaApiKey}
                selectedModel={selectedModel}
                apiVersion={apiVersion}
                latexCode={latexCode} 
                setLatexCode={setLatexCode}
                setOriginalCode={setOriginalCode}
                showToast={showToast}
              />
            </aside>
            
            <div 
              className={`resizer ${isResizing ? 'is-resizing' : ''}`} 
              onMouseDown={startResizing}
            />
            
            <main className="main-editor">
              <CodeViewer 
                latexCode={latexCode} 
                setLatexCode={setLatexCode}
                originalCode={originalCode}
                setOriginalCode={setOriginalCode}
              />
            </main>
          </>
        )}

        {isResizing && view === 'editor' && <div className="resize-overlay" />}
      </div>

      {toast && (
        <div className={`notification-toast ${toast.type} animate-in`}>
          <Sparkles size={16} />
          <span>{toast.message}</span>
        </div>
      )}

      <SupportModal 
        isOpen={isSupportOpen} 
        onClose={handleCloseSupport} 
      />
    </div>
  );
}

export default App;
