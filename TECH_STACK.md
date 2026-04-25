# Tech Stack & Dependencies: Zenith-LaTeX

**Zenith-LaTeX** is built using a modern, lightweight, and serverless stack designed for high performance and zero maintenance.

---

## 1. Core Frameworks
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React** | 19.x | Component-based UI and state management. |
| **Vite** | 8.x | High-speed build tool and development server. |
| **JavaScript** | ES2026+ | Core application logic (Standard: ESM). |

---

## 2. Key Dependencies
- **@monaco-editor/react:** The industry-standard code editor (powers VS Code). Used for the high-end LaTeX editing and diffing experience.
- **Lucide-React:** A collection of beautiful, consistent SVG icons for the premium interface.
- **TeXLive.net:** A specialized external LaTeX engine that compiles source code into high-resolution PDF streams.

---

## 3. AI Infrastructure
- **Google Gemini API:** Primary engine for complex resume transformations and structural changes.
- **NVIDIA NIM (Gemma 2 2B):** Turbo engine for low-latency completions and real-time grammar assistance.

---

## 4. UI/UX Methodology
- **Vanilla CSS:** Chosen over Tailwind for maximum flexibility and performance.
- **Glassmorphism:** A design style utilizing semi-transparent, blurred backgrounds to create a layered, modern aesthetic.
- **Responsive Workspace:** Custom CSS-based resizer logic for side-by-side editing on various screen sizes.

---

## 5. Security Architecture
- **Local Persistence:** Uses `localStorage` for all sensitive data (API Keys, Resume Content).
- **Stateless Operation:** No database is used. The app functions as a "thick client" communicating directly with AI providers.
- **CORS Management:** Utilizes hidden HTML forms to enable cross-origin PDF compilation without a proxy server.

---
**Document Status: Active**
**Maintained by: Antigravity AI**
