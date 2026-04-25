import React, { useMemo } from 'react';
import { Target, TrendingUp, Zap, Award, CheckCircle2, AlertCircle, ChevronRight, Mail, Phone, Link, Search } from 'lucide-react';
import './AnalyticsDashboard.css';

const AnalyticsDashboard = ({ latexCode, setLatexCode, targetJD, setTargetJD, showToast }) => {
  const handleOptimize = (skill) => {
    // 1. Create a professional bullet point
    const newBullet = `\\item Optimized ${skill} architectures to improve system performance and reliability.`;
    
    // 2. Find the best place to insert (first itemize block)
    if (latexCode.includes('\\begin{itemize}')) {
      const updatedCode = latexCode.replace('\\begin{itemize}', `\\begin{itemize}\n    ${newBullet}`);
      setLatexCode(updatedCode);
      showToast(`Success! ${skill} added to resume.`);
    } else {
      // Fallback: Just append to the end of document
      const updatedCode = latexCode.replace('\\end{document}', `${newBullet}\n\\end{document}`);
      setLatexCode(updatedCode);
      showToast(`Added ${skill} to document.`);
    }
  };

  // Real-time Analysis Engine
  const analytics = useMemo(() => {
    // Improved Parser: Remove command names (e.g. \href, \textbf) but KEEP the content inside braces
    const text = latexCode
      .replace(/\\[a-zA-Z]+/g, ' ') // Remove \command
      .replace(/{|}/g, ' ')        // Remove { and } but keep the text inside
      .toLowerCase();
    
    // 1. Keyword Analysis (Smarter Extraction)
    let keywordsToFind = [
      'generative ai', 'llm', 'rag', 'pytorch', 'tensorflow', 
      'kubernetes', 'docker', 'python', 'langchain', 'vector database', 
      'fine-tuning', 'transformers', 'nlp', 'distributed systems', 'gpu'
    ];

    if (targetJD && targetJD.length > 20) {
      // Use a more comprehensive tech list
      const techGlossary = [
        'react', 'node', 'python', 'java', 'aws', 'azure', 'docker', 'kubernetes', 'sql', 'nosql', 'ai', 'ml', 'nlp', 'git', 
        'typescript', 'graphql', 'rest api', 'ci/cd', 'terraform', 'jenkins', 'microservices', 'scrum', 'agile'
      ];
      const jdLower = targetJD.toLowerCase();
      const extracted = techGlossary.filter(tech => jdLower.includes(tech));
      if (extracted.length > 0) keywordsToFind = [...new Set([...extracted, ...keywordsToFind.slice(0, 5)])];
    }
    
    const foundKeywords = keywordsToFind.filter(k => text.includes(k.toLowerCase()));
    const missingKeywords = keywordsToFind
      .filter(k => !text.includes(k.toLowerCase()))
      .slice(0, 5)
      .map(k => k.charAt(0).toUpperCase() + k.slice(1));

    // 2. Contact Signal Validation
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
    const hasPhone = /(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/.test(text);
    const hasLinkedIn = /linkedin\.com\/in\//.test(text);

    // 3. Quantification & Verbs
    const hasNumbers = (text.match(/\d+/g) || []).length;
    const hasPercentages = (text.match(/%/g) || []).length;
    const quantScore = Math.min(100, (hasNumbers * 5) + (hasPercentages * 10));

    const actionVerbs = ['led', 'optimized', 'developed', 'architected', 'scaled', 'implemented', 'engineered', 'mentored'];
    const foundVerbs = actionVerbs.filter(v => text.includes(v));
    const verbScore = Math.min(100, (foundVerbs.length / actionVerbs.length) * 100);

    // 4. Recommendations Logic
    const recommendations = [];
    if (!hasLinkedIn) recommendations.push({ task: 'Add LinkedIn Profile', priority: 'High', impact: '+10%' });
    if (quantScore < 50) recommendations.push({ task: 'Quantify 3 more bullet points (use % or #)', priority: 'High', impact: '+15%' });
    if (missingKeywords.length > 0) recommendations.push({ task: `Integrate ${missingKeywords[0]} into Skills`, priority: 'Medium', impact: '+5%' });
    if (verbScore < 60) recommendations.push({ task: 'Use stronger Action Verbs (e.g. "Architected")', priority: 'Medium', impact: '+8%' });

    // 5. Tenure
    const years = text.match(/\b(20\d{2})\b/g) || [];
    let tenure = 0;
    if (years.length >= 2) {
      const sortedYears = [...new Set(years)].map(Number).sort();
      tenure = sortedYears[sortedYears.length - 1] - sortedYears[0];
    }
    const tenureScore = Math.min(100, (tenure / 10) * 100);

    const keywordWeight = (foundKeywords.length / keywordsToFind.length) * 100;
    const matchScore = Math.round(
      (keywordWeight * 0.4) + (quantScore * 0.2) + (verbScore * 0.1) + (tenureScore * 0.2) + (hasEmail && hasLinkedIn ? 10 : 0)
    );

    return {
      matchScore,
      missingKeywords,
      signals: { hasEmail, hasPhone, hasLinkedIn },
      tenure,
      recommendations,
      strengths: [
        { label: 'Quantification', score: quantScore, status: quantScore > 70 ? 'excellent' : 'good' },
        { label: 'Action Verbs', score: Math.round(verbScore), status: verbScore > 70 ? 'excellent' : 'good' },
        { label: 'Exp. Tenure', score: Math.round(tenureScore), status: tenure > 5 ? 'excellent' : 'good' },
        { label: 'ATS Signals', score: (hasEmail ? 33 : 0) + (hasPhone ? 33 : 0) + (hasLinkedIn ? 34 : 0), status: hasEmail && hasLinkedIn ? 'excellent' : 'alert' }
      ]
    };
  }, [latexCode, targetJD]);

  const { matchScore, missingKeywords, strengths, signals, tenure, recommendations } = analytics;

  const loadSampleJD = () => {
    setTargetJD(`Senior Gen AI Engineer
Responsibilities:
- Build and scale RAG pipelines using LangChain and Vector Databases.
- Fine-tune Large Language Models (LLMs) on proprietary datasets.
- Deploy distributed systems on Kubernetes and Docker.
- Experience with PyTorch, Python, and GPU optimization required.
- Architect high-performance NLP solutions for enterprise clients.`);
  };

  return (
    <div className="analytics-container animate-in">
      <div className="analytics-layout">
        {/* Left Column: Inputs & Signals */}
        <div className="analytics-sidebar">
          <div className="jd-input-container">
            <div className="input-header">
              <Search size={16} />
              <span>Target Job Description</span>
            </div>
            <textarea 
              placeholder="Paste the Job Description here to analyze your match..."
              value={targetJD}
              onChange={(e) => setTargetJD(e.target.value)}
            />
            {!targetJD && (
              <button className="btn-sample" onClick={loadSampleJD}>
                Load Sample JD
              </button>
            )}
          </div>

          <div className="signals-card">
            <h3>Essential ATS Signals</h3>
            <div className="signal-list">
              <div className={`signal-item ${signals.hasEmail ? 'found' : 'missing'}`}>
                <Mail size={16} />
                <span>Email Address</span>
                <div className="indicator"></div>
              </div>
              <div className={`signal-item ${signals.hasPhone ? 'found' : 'missing'}`}>
                <Phone size={16} />
                <span>Phone Number</span>
                <div className="indicator"></div>
              </div>
              <div className={`signal-item ${signals.hasLinkedIn ? 'found' : 'missing'}`}>
                <Link size={16} />
                <span>LinkedIn Profile</span>
                <div className="indicator"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="analytics-main">
          <div className="analytics-header">
            <div>
              <h1>Impact Dashboard</h1>
              <p>Real-time ATS analysis & optimization</p>
            </div>
            <div className="tenure-badge">
              {tenure} Yrs Experience Detected
            </div>
          </div>

          <div className="analytics-grid">
            <div className="analytics-card score-card">
              <div className="gauge-container">
                <svg viewBox="0 0 100 100" className="gauge">
                  <circle className="gauge-bg" cx="50" cy="50" r="45" />
                  <circle 
                    className="gauge-progress" 
                    cx="50" cy="50" r="45" 
                    style={{ strokeDashoffset: 283 - (283 * matchScore) / 100 }}
                  />
                </svg>
                <div className="score-value">
                  <span className="number">{matchScore}</span>
                  <span className="percent">%</span>
                  <span className="label">ATS Match</span>
                </div>
              </div>
            </div>

            <div className="analytics-card gap-card">
              <div className="card-header">
                <Target size={18} />
                <h3>Keyword Gaps</h3>
              </div>
              <div className="gap-list">
                {missingKeywords.length > 0 ? missingKeywords.map(skill => (
                  <div key={skill} className="gap-item">
                    <span>{skill}</span>
                    <button className="btn-tiny" onClick={() => handleOptimize(skill)}>Optimize</button>
                  </div>
                )) : (
                  <div className="gap-item success">
                    <CheckCircle2 size={14} />
                    <span>Keyword Match Perfect!</span>
                  </div>
                )}
              </div>
            </div>

            <div className="analytics-card roadmap-card wide">
              <div className="card-header">
                <TrendingUp size={18} />
                <h3>Optimization Roadmap</h3>
              </div>
              <div className="roadmap-tasks">
                {recommendations.map((rec, i) => (
                  <div key={i} className="task-item">
                    <div className="task-main">
                      <span className={`priority-tag ${rec.priority.toLowerCase()}`}>{rec.priority}</span>
                      <span className="task-text">{rec.task}</span>
                    </div>
                    <span className="impact-tag">{rec.impact}</span>
                  </div>
                ))}
                {recommendations.length === 0 && (
                  <div className="success-message">
                    <CheckCircle2 size={24} />
                    <p>Your resume is fully optimized for this JD!</p>
                  </div>
                )}
              </div>
            </div>

            <div className="analytics-card metrics-card wide">
              <div className="card-header">
                <Zap size={18} />
                <h3>Strength Indicators</h3>
              </div>
              <div className="metrics-grid">
                {strengths.map(m => (
                  <div key={m.label} className="metric-item">
                    <div className="metric-info">
                      <span>{m.label}</span>
                      <span className={`status-tag ${m.status}`}>{m.score}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${m.score}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
