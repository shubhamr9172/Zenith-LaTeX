# Case Study: Zenith-LaTeX

## 1. Project Inception & Goal
The objective was to build a professional, web-based LaTeX resume application. Unlike standard resume builders, this project aimed to leverage the **Gemini API** as an "AI Architect," allowing users to paste raw LaTeX code and describe their updates in natural language. The AI would then return perfectly formatted, updated LaTeX code. The ultimate goal was to create a zero-cost, globally deployable SaaS application.

## 2. Phase 1: Foundation & The Editor Lifecycle Bug
We started by bootstrapping a React/Vite application featuring a sleek, dark-mode glassmorphism UI. The core interface was split between a chat interface on the left and a code viewer on the right.

### The Challenge: "TextModel got disposed before DiffEditorWidget model got reset"
We upgraded from a standard `<textarea>` to the professional `@monaco-editor/react` to provide a true IDE experience, including a side-by-side **Diff Viewer** so users could see exactly what the AI changed.
* **The Error:** When switching between the "Code View" and "PDF Preview" tabs, the application would crash completely with a Monaco Editor lifecycle error.
* **The Resolution:** The issue was caused by React aggressively unmounting the Monaco instance while the Diff Editor was still holding onto the text models. We resolved this by changing the tab-switching logic from conditional rendering (`{activeTab === 'code' && ...}`) to CSS-based display toggling (`style={{ display: activeTab === 'code' ? 'block' : 'none' }}`). This kept the editor alive in the background and completely eliminated the crash.

## 3. Phase 2: PDF Compilation & The CORS Nightmare
A resume builder is useless without a PDF. We integrated the public compilation engine `texlive.net/cgi-bin/latexcgi`.

### The Challenge: CORS and API Proxies
Initially, we attempted to send the LaTeX code to `texlive.net` using standard `fetch()` requests via a local Vite proxy server. 
* **The Errors:** We encountered severe CORS (Cross-Origin Resource Sharing) blocks. The browser refused to load the PDF blob, throwing `400 Bad Request` and `A listener indicated an asynchronous response` errors. 
* **The Resolution:** Instead of building a custom backend server to proxy the requests (which would cost money to host), we pivoted to a brilliant, 100% client-side architecture. We created a **hidden HTML form** that submitted a `POST` request directly to `texlive.net` with the target set to an `<iframe>`. Because HTML forms are not subject to standard fetch CORS restrictions, the PDF compiled instantly and seamlessly embedded itself into the app.

## 4. Phase 3: Premium SaaS Upgrades
With the core engine working flawlessly, we upgraded the app from a basic tool to a premium product:
* **Auto-Save & Session Recovery:** Implemented `localStorage` synchronization for both the `latexCode` and the `chat history`. This prevented catastrophic data loss if the user accidentally refreshed the page.
* **Magic AI Action Chips:** Added one-click action buttons above the chat (e.g., "✨ Fix Typos", "💼 Tailor to Job") to instantly fire complex prompts without typing.
* **Premium Template Library:** Built a dropdown menu allowing users to load pre-built, globally accepted resume templates (Standard Professional and Modern Clean).

### The Challenge: "Bad Form: no main document"
While implementing a "Download PDF" button, we attempted to rename the downloaded file by passing `filename[]=resume.tex` in the hidden form payload.
* **The Error:** The `texlive.net` API rejected the request, stating "no main document."
* **The Resolution:** We discovered the public API strictly requires the main compilation file to be named exactly `document.tex`. We reverted the internal filename to `document.tex` and utilized `target="_blank"`, allowing the browser to natively handle the PDF download in a new tab.

## 5. Phase 4: Enforcing Global Hiring Standards
To ensure our user base maximizes their hiring potential, we addressed the issue of **ATS (Applicant Tracking System) compatibility**.
* **The Resolution:** We silently updated the hidden Gemini System Prompt within `ChatInterface.jsx`. We explicitly instructed the AI: *"When generating or editing resume bullet points, ALWAYS prioritize ATS compatibility: use strong Action Verbs, follow the STAR method (Situation, Task, Action, Result), and quantify achievements."*
* **The Impact:** Now, regardless of how poorly a user writes their initial prompt, the AI forces the output into a highly-hirable, corporate-standard format.

## Conclusion
The **Zenith-LaTeX** evolved from a buggy prototype into a highly robust, fully "serverless" application. By leveraging intelligent browser workarounds (hidden forms, CSS toggling, localStorage) and strict AI prompting, the app achieves enterprise-level functionality with absolute zero backend maintenance costs. It is fully ready for global deployment on platforms like Vercel or Netlify.

## 6. Value Proposition: Why not just use ChatGPT?
An interviewer might ask: *"Why build this when I can just paste code into ChatGPT?"* 
* **The Workflow Gap:** Standard LLMs require a 7-step manual process (Copy-Paste-Edit-Copy-Paste-Compile). Our app reduces this to a 2-click seamless loop.
* **Review Integrity:** ChatGPT gives you a block of text. We provide a **Monaco Diff Viewer**, allowing for line-by-line verification of AI changes, which is critical for high-stakes documents like resumes.
* **Integrated Environment:** By merging the chat, the editor, and the TeX compiler into one UI, we eliminate "Context Switching," significantly increasing user productivity.

## 7. Interviewer Prep (Potential Q&A)
**Q: Why did you choose LaTeX over a standard Rich Text Editor?**
* **A:** LaTeX ensures perfect formatting consistency across all systems. Unlike Word, it separates content from design, which is ideal for AI processing. It's also the "gold standard" for high-end technical resumes.

**Q: How do you handle the security of the User's API Key?**
* **A:** We use a **"Bring Your Own Key" (BYOK)** model. The key is stored only in the user's local browser storage and is never sent to our own servers. This ensures 100% privacy and zero data harvesting.

**Q: What was the most difficult technical challenge?**
* **A:** Handling **CORS (Cross-Origin Resource Sharing)** for the PDF compiler. Standard `fetch` requests were blocked by the browser. I solved this by using a hidden HTML form that POSTs to an iframe, which is a clever architectural workaround that bypasses modern browser security restrictions without needing a costly backend proxy.

**Q: How does the AI know how to make the resume "hirable"?**
* **A:** I implemented a **hidden System Instruction layer**. Even if the user gives a simple prompt, the AI is pre-programmed to enforce the **STAR method** and use strong **Action Verbs**, ensuring the output meets global recruitment standards.

---
**Project Creator:** Shubham Reddy
**Project Status:** Feature-Complete & Production-Ready
