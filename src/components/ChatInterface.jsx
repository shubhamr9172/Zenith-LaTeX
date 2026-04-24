import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import './ChatInterface.css';

function ChatInterface({ apiKey, latexCode, setLatexCode, setOriginalCode }) {
  const defaultMessages = [
    { role: 'model', content: "Hello! I am Zenith-LaTeX. Paste your code on the right, and tell me what you'd like to update." }
  ];
  
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : defaultMessages;
  });
  
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

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

    if (!apiKey) {
      alert("Please set your Gemini API key in the settings first.");
      return;
    }

    const userMessage = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMessage]);
    if (!customText) setInput('');
    setIsLoading(true);

    try {
      // Build conversation history, skipping the hardcoded initial greeting
      const apiMessages = messages
        .filter((_, idx) => idx > 0) 
        .map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        }));

      // Append the current turn with the current LaTeX state
      apiMessages.push({
        role: 'user',
        parts: [{ text: `Current LaTeX Code:\n${latexCode}\n\nUser Request: ${userMessage.content}` }]
      });

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{
              text: `You are Zenith-LaTeX, the expert AI Resume Architect. 
Your goal is to parse the user's LaTeX resume code and output the EXACT UPDATED LaTeX code based on their request.
CRITICAL INSTRUCTIONS:
1. ONLY output valid LaTeX code.
2. DO NOT output markdown formatting like \`\`\`latex. 
3. DO NOT output conversational filler. Just the code.
4. Keep the exact same structure, preamble, and styling of the original code, only modifying what is requested.
5. When generating or editing resume bullet points, ALWAYS prioritize ATS compatibility: use strong Action Verbs, follow the STAR method (Situation, Task, Action, Result), and quantify achievements.`
            }]
          },
          contents: apiMessages
        })
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const candidate = data.candidates?.[0];
      if (!candidate) {
        throw new Error("No response generated from the AI.");
      }

      if (candidate.finishReason === 'SAFETY') {
        throw new Error("Generation blocked due to safety filters.");
      }

      let newCode = candidate.content?.parts?.[0]?.text;
      if (!newCode) {
        throw new Error("The AI returned an empty or invalid response.");
      }
      
      // Robustly clean up markdown wrappers and trailing whitespace
      newCode = newCode.replace(/```[a-zA-Z]*\n?/g, '').replace(/```/g, '').trim();

      setOriginalCode(latexCode);
      setLatexCode(newCode);
      setMessages(prev => [...prev, { role: 'model', content: "I've updated the LaTeX code. Please review the highlighted changes on the right." }]);

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
