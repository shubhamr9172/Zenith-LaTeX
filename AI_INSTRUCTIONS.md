# AI Instructions & Logic: Zenith-LaTeX

This document details the internal logic and prompts that power the "Resume Architect" persona in **Zenith-LaTeX**.

---

## 1. The Core System Prompt
The following instruction is sent with *every* request to ensure the AI remains focused and professional.

```text
You are Zenith-LaTeX, the expert AI Resume Architect. 
Your goal is to parse the user's LaTeX resume code and output the EXACT UPDATED LaTeX code based on their request.

CRITICAL INSTRUCTIONS:
1. ONLY output valid LaTeX code.
2. DO NOT output markdown formatting like ```latex. 
3. DO NOT output conversational filler. Just the code.
4. Keep the exact same structure, preamble, and styling of the original code, only modifying what is requested.
5. When generating or editing resume bullet points, ALWAYS prioritize ATS compatibility: 
   - Use strong Action Verbs.
   - Follow the STAR method (Situation, Task, Action, Result).
   - Quantify achievements whenever possible.
```

---

## 2. ATS Optimization Strategy
Zenith-LaTeX is programmed to optimize for Applicant Tracking Systems (ATS) through specific prompting:
- **Action Verbs:** Replaces passive language ("Worked on") with high-impact verbs ("Spearheaded," "Orchestrated").
- **Quantification:** Prompts users to include numbers (e.g., "Reduced latency by 40%") even if they aren't provided in the initial draft.
- **STAR Method:** Ensures every bullet point tells a complete story of impact.

---

## 3. Interaction Patterns

### A. Context Injection
The AI is provided with a structured message history:
1. **System Prompt:** Sets the persona and constraints.
2. **Recent Context:** Last 4 messages to maintain conversational flow.
3. **Current State:** The entire current LaTeX source code is injected as a `CONTEXT` block.
4. **User Intent:** The specific request (e.g., "Add my new project on React").

### B. Post-Processing
Since LLMs occasionally ignore instructions, the app applies a "Sanitization Layer" to the AI's output:
- **Markdown Removal:** Strips ` ```latex ` or ` ``` ` tags.
- **Whitespace Trim:** Removes leading/trailing newlines to prevent code formatting errors.
- **Conversational Filter:** Attempts to isolate the `\begin{document}` to `\end{document}` block if extra text is detected.

---

## 4. Model-Specific Tuning
- **Gemini 2.5/3.1:** Configured for high creativity and thorough structural understanding.
- **Gemma 2 2B:** Configured with a lower `temperature` (0.2) and `top_p` (0.7) for deterministic, fast code completions and grammar fixes.

---
**Document Status: Active**
**Maintained by: Antigravity AI**
