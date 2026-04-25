import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Target, 
  FileCode2, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Briefcase, 
  ChevronRight,
  CheckCircle2,
  Cpu,
  Layers,
  History
} from 'lucide-react';
import './LandingPage.css';

const Typewriter = ({ text, delay = 50, onComplete }) => {
  const [currentText, setCurrentText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [index, text, delay, onComplete]);

  return <span>{currentText}</span>;
};

const ResumeMatchDemo = () => {
  const [step, setStep] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="demo-container">
      <div className="demo-panels">
        {/* Panel 1: Job Description */}
        <div className={`demo-panel jd ${step === 0 || step === 1 ? 'active' : ''}`}>
          <div className="panel-header">Target Job Description</div>
          <div className="panel-content">
            <h4 className="text-gradient" style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Senior Gen AI Engineer</h4>
            <div className="jd-tags">
              <span className={step >= 1 ? 'highlight' : ''}>LLM Fine-tuning</span>
              <span className={step >= 1 ? 'highlight' : ''}>RAG Architectures</span>
              <span className={step >= 1 ? 'highlight' : ''}>Vector Databases</span>
            </div>
            <p className="jd-text">
              We are seeking an ML expert to build production-grade RAG systems and fine-tune open-source LLMs like Llama 3 and Gemma for domain-specific tasks.
            </p>
          </div>
        </div>

        {/* Panel 2: Interaction */}
        <div className={`demo-panel ai ${step === 2 || step === 3 ? 'active' : ''}`}>
          <div className="panel-header">Zenith AI Architect</div>
          <div className="panel-content ai-chat">
            <div className="chat-bubble user">
              {step === 0 && <span style={{ opacity: 0.5 }}>Waiting for input...</span>}
              {step >= 1 && (
                <Typewriter 
                  text="Tailor my profile for this Gen AI role. Focus on my experience with RAG and Llama 3 fine-tuning." 
                  delay={20}
                />
              )}
            </div>
            {step === 2 && (
              <div className="chat-bubble bot thinking animate-in">
                <Sparkles size={14} /> <span>Analyzing JD & re-architecting code...</span>
              </div>
            )}
            {step >= 3 && (
              <div className="chat-bubble bot success animate-in">
                <CheckCircle2 size={12} /> <Typewriter text="Resume tailored. Added quantified impact for AI projects." delay={20} />
              </div>
            )}
          </div>
        </div>

        {/* Panel 3: Result */}
        <div className={`demo-panel resume ${step === 4 ? 'active' : ''}`}>
          <div className="panel-header">Updated LaTeX Source</div>
          <div className="panel-content code-block">
             <div className="code-line">...</div>
             <div className={`code-line ${step >= 4 ? 'added' : ''}`}>
                {step >= 4 ? "+ \\item Optimized RAG pipeline using Pinecone, reducing latency by 150ms." : "\\item Worked on some AI models."}
             </div>
             <div className={`code-line ${step >= 4 ? 'added' : ''}`}>
                {step >= 4 ? "+ \\item Fine-tuned Llama 3 (70B) achieving 92% accuracy on domain tasks." : "\\item Helped with LLM research."}
             </div>
             <div className="code-line">...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

function LandingPage({ onStart }) {
  return (
    <div className="landing-page">
      <div className="gradient-sphere pos-1"></div>
      <div className="gradient-sphere pos-2"></div>

      <nav className="landing-nav">
        <div className="logo">
          <FileCode2 size={28} color="var(--accent)" />
          <span>Zenith-LaTeX</span>
        </div>
        <button className="btn primary small" onClick={onStart}>
          Enter App <ChevronRight size={16} />
        </button>
      </nav>

      <header className="landing-hero">
        <div className="hero-content">
          <div className="badge">
            <Sparkles size={14} /> The Future of Resume Building
          </div>
          <h1>Don't Just Apply. <span className="text-gradient">Get Shortlisted.</span></h1>
          <p>
            Zenith-LaTeX isn't a template filler. It's a high-performance engine that re-architects 
            your resume code to match specific job descriptions instantly.
          </p>
          <div className="hero-actions">
            <button className="btn primary x-large" onClick={onStart}>
              Tailor My Resume Now <ArrowRight size={20} />
            </button>
          </div>
        </div>
        
        <div className="hero-demo">
           <ResumeMatchDemo />
        </div>
      </header>

      <section className="walkthrough-section">
        <div className="section-title">
           <h2>How it Works</h2>
           <p>Four steps to a 100% ATS score.</p>
        </div>
        
        <div className="scroll-walkthrough">
           <div className="walkthrough-item">
              <div className="walk-icon"><FileCode2 size={32} /></div>
              <div className="walk-text">
                 <h3>1. Import Your Code</h3>
                 <p>Paste your existing LaTeX code or choose from our globally accepted templates. Our editor supports full syntax highlighting.</p>
              </div>
           </div>
           
           <div className="walkthrough-item">
              <div className="walk-icon"><Cpu size={32} /></div>
              <div className="walk-text">
                 <h3>2. Architect with AI</h3>
                 <p>Use the Chat Interface to request changes. Our AI uses the **STAR method** to turn generic bullet points into high-impact achievements.</p>
              </div>
           </div>

           <div className="walkthrough-item">
              <div className="walk-icon"><History size={32} /></div>
              <div className="walk-text">
                 <h3>3. Review & Revert</h3>
                 <p>Never lose control. Review every AI change in a side-by-side Diff. Accept what you love, discard what you don't.</p>
              </div>
           </div>

           <div className="walkthrough-item">
              <div className="walk-icon"><Layers size={32} /></div>
              <div className="walk-text">
                 <h3>4. Instant Compilation</h3>
                 <p>Switch to the PDF tab for a live preview. We bypass CORS to compile your LaTeX into a professional PDF in seconds.</p>
              </div>
           </div>
        </div>
      </section>

      <section className="strategy-section">
         <div className="strategy-card">
            <div className="strategy-content">
               <h2 className="text-gradient">How to get 100% from Zenith</h2>
               <div className="strategy-grid">
                  <div className="strategy-item">
                     <CheckCircle2 size={18} color="var(--accent)" />
                     <span><strong>Quantify Everything:</strong> Always include numbers. Zenith will prompt you to turn "Improved speed" into "Boosted speed by 35%."</span>
                  </div>
                  <div className="strategy-item">
                     <CheckCircle2 size={18} color="var(--accent)" />
                     <span><strong>Targeted Keywords:</strong> Paste the JD into the chat and ask Zenith to "Highlight my leadership skills for this role."</span>
                  </div>
                  <div className="strategy-item">
                     <CheckCircle2 size={18} color="var(--accent)" />
                     <span><strong>STAR Method:</strong> Ask Zenith to "Rewrite my experience section using the STAR method."</span>
                  </div>
                  <div className="strategy-item">
                     <CheckCircle2 size={18} color="var(--accent)" />
                     <span><strong>Turbo Consistency:</strong> Use Gemma Turbo for quick grammar passes to ensure 100% professional tone.</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <section className="features-grid">
        <div className="feature-card">
          <div className="icon-box"><Target color="var(--accent)" /></div>
          <h3>ATS-Optimized</h3>
          <p>Pass through automated filters with code-level optimizations and high-impact vocabulary.</p>
        </div>
        <div className="feature-card">
          <div className="icon-box"><Zap color="#FFD700" /></div>
          <h3>Turbo Mode</h3>
          <p>Low-latency suggestions powered by Gemma 2 2B for rapid iterative polishing.</p>
        </div>
        <div className="feature-card">
          <div className="icon-box"><Briefcase color="#4CAF50" /></div>
          <h3>Career Centric</h3>
          <p>Designed by developers for developers. We focus on the tech stack that matters.</p>
        </div>
        <div className="feature-card">
          <div className="icon-box"><ShieldCheck color="#2196F3" /></div>
          <h3>Privacy First</h3>
          <p>No account required. No data harvesting. Your resume and keys stay with you.</p>
        </div>
      </section>

      <footer className="landing-footer">
        <p>&copy; 2026 Zenith-LaTeX. Created by Shubham Reddy. Build something extraordinary.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
