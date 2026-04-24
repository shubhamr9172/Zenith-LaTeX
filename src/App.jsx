import React, { useState } from 'react';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import CodeViewer from './components/CodeViewer';

function App() {
  const defaultLatex = '% Paste your LaTeX resume code here...\n\n\\documentclass{article}\n\\begin{document}\n\n\\end{document}';
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [latexCode, setLatexCode] = useState(() => localStorage.getItem('latexCode') || defaultLatex);
  const [originalCode, setOriginalCode] = useState(() => localStorage.getItem('originalCode') || localStorage.getItem('latexCode') || defaultLatex);

  React.useEffect(() => {
    localStorage.setItem('latexCode', latexCode);
  }, [latexCode]);

  React.useEffect(() => {
    localStorage.setItem('originalCode', originalCode);
  }, [originalCode]);

  return (
    <div className="app-layout">
      <Header 
        apiKey={apiKey} 
        setApiKey={setApiKey} 
        setLatexCode={setLatexCode}
        setOriginalCode={setOriginalCode}
      />
      
      <div className="workspace">
        <aside className="sidebar">
          <ChatInterface 
            apiKey={apiKey} 
            latexCode={latexCode} 
            setLatexCode={setLatexCode}
            setOriginalCode={setOriginalCode}
          />
        </aside>
        
        <main className="main-editor">
          <CodeViewer 
            latexCode={latexCode} 
            setLatexCode={setLatexCode}
            originalCode={originalCode}
            setOriginalCode={setOriginalCode}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
