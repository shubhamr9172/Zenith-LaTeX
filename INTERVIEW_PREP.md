# Interview Preparation Guide: Zenith-LaTeX

This document serves as a comprehensive guide to help you explain the technical and strategic aspects of the **Zenith-LaTeX** project during interviews.

---

## 🏗️ Architectural Overview

### Q1: Can you explain the high-level architecture of this app?
**Answer:** It's a modern, "serverless" React application built with Vite. It features a dual-pane layout:
1. **Frontend:** React with hooks for state management (API keys, code, chat history).
2. **AI Engine:** Google Gemini API (Flash-Lite model) for processing natural language requests.
3. **Editor:** Monaco Editor for professional-grade code editing and side-by-side diffing.
4. **Compiler:** Integration with TeXLive.net for real-time LaTeX-to-PDF generation.

### Q2: Why did you choose a "Bring Your Own Key" (BYOK) model?
**Answer:** Two reasons:
1. **Privacy:** The user's API key and resume data never touch our servers. It stays in their browser.
2. **Scalability:** It makes the app zero-cost for the creator. I don't have to pay for a backend or AI tokens; users use their own free-tier or paid-tier Gemini keys.

---

## 🛠️ Technical Challenges & Solutions

### Q3: What was the biggest technical hurdle you faced?
**Answer:** Handling **CORS (Cross-Origin Resource Sharing)** for PDF compilation.
* **The Problem:** The TeXLive API blocked standard `fetch()` requests from the browser. 
* **The Solution:** I used a hidden HTML form that POSTs to a hidden iframe. Since HTML forms are not subject to the same strict CORS restrictions as `fetch`, the PDF compiled and loaded perfectly. This avoided the need for a costly backend proxy.

### Q4: I see you used Monaco Editor. Did you face any React-specific issues with it?
**Answer:** Yes, the **TextModel Lifecycle** issue.
* **The Problem:** When switching between "Code" and "PDF" tabs, React would unmount the editor, but Monaco would still hold onto the text models, causing a crash.
* **The Solution:** Instead of unmounting the component, I used CSS `display: none` to hide the editor when not in use. This kept the editor instance alive in memory, preventing crashes and improving performance.

### Q5: How did you implement the "Accept Changes" feature?
**Answer:** I maintained two states: `originalCode` and `latexCode`. When the AI returns a suggestion, it updates `latexCode`. The Monaco `DiffEditor` compares these two. When the user clicks "Accept," we simply set `originalCode` equal to the current `latexCode`, which clears the diff highlights.

---

## 🤖 AI & Prompt Engineering

### Q6: How did you ensure the AI doesn't hallucinate or output non-LaTeX text?
**Answer:** Through strict **System Instructions**. I hardcoded a system prompt that tells the AI:
1. Only output raw LaTeX.
2. No markdown wrappers (like \`\`\`latex).
3. No conversational filler.
4. Maintain the exact same structure as the original code.

### Q7: How does your app help with ATS (Applicant Tracking System) optimization?
**Answer:** I integrated a layer of recruitment logic into the AI's instructions. The AI is specifically told to use the **STAR method** (Situation, Task, Action, Result) and **Action Verbs** when editing bullet points. This ensures the output isn't just "formatted code" but "hirable content."

---

## 💡 Product & Design Thinking

### Q8: Why LaTeX instead of just a standard Rich Text Editor (like Google Docs)?
**Answer:** LaTeX is the standard for high-end technical resumes because it guarantees 100% layout consistency. By using LaTeX, we separate **content** (what the AI edits) from **design** (the preamble). This makes it much easier for the AI to make precise edits without breaking the overall look.

### Q9: Why include a Diff Viewer instead of just replacing the code?
**Answer:** Transparency. A resume is a high-stakes document. A user should never trust an AI to change their personal details blindly. The Diff Viewer provides **safety and oversight**, allowing the user to verify every comma and date before finalizing.

---

## 🚀 Future Improvements

### Q10: If you had more time, what would you add next?
**Answer:** 
1. **Multi-file Support:** Handling `.cls` or `.bib` files for more complex templates.
2. **AI-driven Linter:** A regex-based system to catch LaTeX syntax errors *before* the user tries to compile.
3. **Template Preview Gallery:** A visual thumbnail gallery for the template library.

---
**Created by Shubham Reddy**
*Interview Guide for Zenith-LaTeX*
