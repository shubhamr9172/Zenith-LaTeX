import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Zap, Clock } from 'lucide-react';
import './ChatInterface.css';

function ChatInterface({ apiKey, nvidiaApiKey, selectedModel, apiVersion, latexCode, setLatexCode, setOriginalCode }) {
  const defaultMessages = [
    { role: 'model', content: "Hello! I am Zenith-LaTeX. Paste your code on the right, and tell me what you'd like to update." }
  ];

  const systemPrompt = `You are Zenith-LaTeX, a headless LaTeX transformation engine.
Your output is piped DIRECTLY into a .tex compiler. 
CRITICAL RULES:
1. ONLY output valid LaTeX code.
2. DO NOT include ANY conversational text, explanations, or 'Here is your code' style markers.
3. If the user asks a question that doesn't require code changes, still return the FULL LaTeX code with the answer embedded as a LaTeX comment if necessary.
4. You MUST return the ENTIRE LaTeX document from \\documentclass to \\end{document} every time. Never output snippets.
5. Any text outside of LaTeX commands will cause a CRITICAL SYSTEM FAILURE. Silence is mandatory; only code is allowed.`;
  
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : defaultMessages;
  });

  const [usageStats, setUsageStats] = useState({
    total: 0,
    prompt: 0,
    completion: 0,
    requests: 0
  });

  const [resetTime, setResetTime] = useState(60);
  const [windowRequests, setWindowRequests] = useState(0);
  
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Quota Reset Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setResetTime((prev) => {
        if (prev <= 1) {
          setWindowRequests(0); // Reset window counter every 60s
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e, customText = null) => {
    e?.preventDefault();
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    // Soft Rate Limit Warning (Option A)
    if (windowRequests >= 10) {
      showToast("Warning: 10+ requests sent this minute. Manage your quota carefully!", "error");
    }

    const isNvidia = selectedModel.startsWith('google/gemma');
    const currentApiKey = isNvidia ? nvidiaApiKey : apiKey;

    if (!currentApiKey) {
      alert(`Please set your ${isNvidia ? 'NVIDIA' : 'Gemini'} API key in the settings first.`);
      return;
    }

    const userMessage = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMessage]);
    if (!customText) setInput('');
    setIsLoading(true);

    try {
      let newCode = '';
      const recentMessages = messages.slice(-4);
      
      if (isNvidia) {
        // NVIDIA / OpenAI Format
        const apiMessages = [
          { role: 'system', content: systemPrompt },
          ...recentMessages.map(m => ({ role: m.role === 'model' ? 'assistant' : 'user', content: m.content })),
          { role: 'user', content: `CONTEXT: Current LaTeX Source Code:\n\n${latexCode}\n\nUSER REQUEST: ${userMessage.content}` }
        ];

        const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${nvidiaApiKey}`
          },
          body: JSON.stringify({
            model: selectedModel,
            messages: apiMessages,
            temperature: 0.2,
            top_p: 0.7,
            max_tokens: 4096
          })
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message || "NVIDIA API Error");
        newCode = data.choices[0].message.content;
        
        setWindowRequests(prev => prev + 1);
        // Mock usage metadata for NVIDIA
        setUsageStats(prev => ({ ...prev, total: prev.total + (data.usage?.total_tokens || 0), requests: prev.requests + 1 }));

      } else {
        // Google Gemini Format
        const apiMessages = recentMessages.map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        }));

        apiMessages.push({
          role: 'user',
          parts: [{ text: `CONTEXT: Current LaTeX Source Code:\n\n${latexCode}\n\nUSER REQUEST: ${userMessage.content}` }]
        });

        const url = `https://generativelanguage.googleapis.com/${apiVersion}/models/${selectedModel}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: systemPrompt }] },
            contents: apiMessages
          })
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        
        setWindowRequests(prev => prev + 1);
        if (data.usageMetadata) {
          setUsageStats(prev => ({
            total: prev.total + data.usageMetadata.totalTokenCount,
            prompt: data.usageMetadata.promptTokenCount,
            completion: data.usageMetadata.candidatesTokenCount,
            requests: prev.requests + 1
          }));
        }

        const candidate = data.candidates?.[0];
        if (candidate?.finishReason === 'SAFETY') throw new Error("Blocked by safety filters.");
        newCode = candidate?.content?.parts?.[0]?.text;
      }

      if (!newCode) throw new Error("The AI returned an empty response.");
      
      // Clean potential markdown formatting
      const cleanedOutput = newCode.replace(/```[a-zA-Z]*\n?/g, '').replace(/```/g, '').trim();

      // SAFETY VALVE: Check if the AI sent code or just chatter
      // We look for common LaTeX markers to confirm it's actually code
      const hasLatexMarkers = cleanedOutput.includes('\\documentclass') || 
                               cleanedOutput.includes('\\begin{document}') || 
                               cleanedOutput.includes('\\section') ||
                               cleanedOutput.includes('\\item');
      
      if (hasLatexMarkers) {
        setOriginalCode(latexCode);
        setLatexCode(cleanedOutput);
        setMessages(prev => [...prev, { role: 'model', content: "I've updated the LaTeX code. Review the changes on the right." }]);
      } else {
        // AI sent conversational text instead of code
        setMessages(prev => [...prev, { role: 'model', content: cleanedOutput }]);
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', content: `Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const magicActions = [
    { label: '✨ Fix Typos', prompt: 'Please fix any typos and grammatical errors without changing the core meaning.', direct: true },
    { label: '✨ Make Professional', prompt: 'Rewrite the bullet points to sound more impactful, professional, and action-oriented.', direct: true },
    { label: '💼 Tailor to Job', prompt: 'Tailor this resume to the following job description: \n\n[PASTE JOB DESCRIPTION HERE]', direct: false }
  ];

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message-wrapper ${msg.role}`}>
            <div className="message-avatar">
              {msg.role === 'model' ? <Bot size={20} /> : <User size={20} />}
            </div>
            <div className="message-bubble">
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message-wrapper model">
             <div className="message-avatar"><Bot size={20} /></div>
             <div className="message-bubble loading">
                <Loader2 className="spinner" size={20} /> Updating code...
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="magic-actions">
        {magicActions.map((action, i) => (
          <button 
            key={i} 
            className="action-chip"
            onClick={() => action.direct ? handleSend(null, action.prompt) : setInput(action.prompt)}
            disabled={isLoading}
          >
            {action.label}
          </button>
        ))}
        <button 
          className="action-chip" 
          style={{ marginLeft: 'auto', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
          onClick={() => {
            setMessages(defaultMessages);
            localStorage.removeItem('chatMessages');
            showToast('Chat history cleared.');
          }}
          disabled={isLoading}
        >
          Clear Chat
        </button>
      </div>

      <div className="usage-bar">
        <div className="usage-item" title="Current AI Model">
          <Bot size={12} className="usage-icon" />
          <span><strong>{selectedModel}</strong></span>
        </div>
        <div className="usage-item" title="Tokens sent in latest request">
          <Zap size={12} className="usage-icon" />
          <span>In Tokens: <strong>{usageStats.prompt}</strong></span>
        </div>
        <div className="usage-item" title="Tokens received in latest response">
          <Bot size={12} className="usage-icon" />
          <span>Out Tokens: <strong>{usageStats.completion}</strong></span>
        </div>
        <div className="usage-item">
          <Clock size={12} className="usage-icon" />
          <span>Reset: <strong>{resetTime}s</strong></span>
        </div>
        <div className="usage-item total" onClick={() => setUsageStats({ total: 0, prompt: 0, completion: 0, requests: 0 })} style={{ cursor: 'pointer' }} title="Total tokens used this session (Click to reset)">
          <span>Session Tokens: <strong>{usageStats.total.toLocaleString()}</strong></span>
        </div>
      </div>

      <form className="chat-input-area" onSubmit={(e) => handleSend(e)}>
        <input 
          type="text" 
          placeholder="E.g., Add a bullet point about optimizing the database..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" className="btn icon-only" disabled={isLoading || !input.trim()}>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}

export default ChatInterface;
