# Zenith-LaTeX 🚀

**Zenith-LaTeX** is a premium, web-based resume builder designed to help job seekers create perfectly formatted, ATS-compliant LaTeX resumes using Artificial Intelligence.

Created by **Shubham Reddy**, this tool acts as an "AI Architect" that takes your raw LaTeX code and user prompts to generate professional, high-impact resume updates instantly.

## ✨ Key Features

- 🧠 **AI-Powered Updates:** Integrated with Google Gemini and NVIDIA Gemma to handle complex LaTeX editing.
- ⚡ **Turbo Mode:** Near-instant suggestions and grammar fixes powered by NVIDIA's Gemma 2 2B.
- 🔍 **Monaco Diff Viewer:** A professional-grade code comparison tool with **Accept/Discard** functionality.
- 📄 **Live PDF Preview:** Instant LaTeX-to-PDF compilation directly in the browser.
- 🎯 **ATS-Optimized:** AI prompts enforce global hiring standards like the STAR method and Action Verbs.
- 💾 **Safe History:** Your data stays in your browser; never on a server.

## 📂 Project Documentation
For a deep dive into the technical and product details, see:
- **[PRD (Product Requirements Document)](./PRD.md)**: Goals, features, and target audience.
- **[Implementation Plan](./IMPLEMENTATION_PLAN.md)**: How the features were built.
- **[AI Instructions & Logic](./AI_INSTRUCTIONS.md)**: The "brain" of Zenith-LaTeX.
- **[Tech Stack](./TECH_STACK.md)**: Technologies and architectural decisions.
- **[System Architecture](./ARCHITECTURE.md)**: High-level design and diagrams.

## 🚀 How to Use

1. **Set your API Key:** Click the ⚙️ icon in the top right and enter your Google Gemini API Key.
2. **Load a Template:** Use the "Load Template..." dropdown in the header to start with a professional boilerplate, or paste your own LaTeX code into the editor.
3. **Chat with the Architect:** Use the chat interface on the left to describe the changes you want (e.g., *"Add a bullet point about my internship at Google"*).
4. **Use Magic Actions:** Click the quick-action chips above the chat (like "✨ Fix Typos") for instant results.
5. **Review Changes:** Check the Diff Viewer on the right. If you're happy, click **"Accept Changes"**.
6. **Compile & Download:** Switch to the **"Preview PDF"** tab, click **"Compile"**, and then **"Download PDF"** to save your new resume.

## 🛠️ Local Development

### Prerequisites
- Node.js installed on your machine.
- A Google Gemini API Key.

### Installation
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the local development server.
4. Open `http://localhost:5173` in your browser.

## 🧰 Tech Stack

- **Frontend:** React, Vite
- **Editor:** Monaco Editor (@monaco-editor/react)
- **AI Engine:** Google Gemini API
- **Icons:** Lucide React
- **PDF Engine:** TeXLive.net (Public API)

---
**Created by [Shubham Reddy](https://github.com/)**
*Empowering job seekers with AI and LaTeX.*
