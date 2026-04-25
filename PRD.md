# Product Requirements Document: Zenith-LaTeX

## 1. Executive Summary
Zenith-LaTeX is an AI-powered LaTeX resume architect designed for high-end professionals. It combines a real-time editor with an intelligent analytics engine that scores resumes against Job Descriptions using industry-standard ATS metrics.

## 2. Core Features

### 🎨 Elite Aesthetic (Emerald Obsidian)
- **High-End Design**: Deep charcoal and emerald green theme with champagne gold accents.
- **Glassmorphism**: Backdrop-blur effects for a premium, editorial feel.
- **Micro-Animations**: Smooth transitions and "animate-in" effects for all components.

### 📊 Impact Analytics Engine
- **ATS Match Score**: Real-time scoring (0-100%) based on keywords, quantification, action verbs, and tenure.
- **Keyword Gap Analysis**: Identifies missing skills from a pasted Job Description.
- **Optimization Roadmap**: Actionable tasks (High/Medium priority) to improve the resume score.
- **One-Click Fix**: Automagically injects missing keywords into the LaTeX code.

### 🤖 AI Chat Interface
- **Resume Architect**: Context-aware AI that understands your full LaTeX code.
- **Dual Engine Support**: Integration for Google Gemini (Flash/Pro) and NVIDIA Gemma 2.
- **Token Tracking**: Real-time monitoring of Input, Output, and Session tokens.
- **Quota Guardian**: Soft rate-limit warning system (10 requests/min threshold).

### 🖋️ Professional Editor
- **LaTeX Intelligence**: Smart parser that preserves content while analyzing structure.
- **Template Library**: One-click loading of elite resume templates.
- **Real-Time Sync**: Instant feedback between code changes and impact metrics.

## 3. Technical Stack
- **Frontend**: React + Vite + Vanilla CSS.
- **State**: React Hooks (useState, useMemo, useEffect).
- **APIs**: Google Gemini, NVIDIA NIM.
- **Icons**: Lucide React (Standardized set).

## 4. UI/UX Standards
- **Zero-Native Popups**: All interactions use custom Toast notifications.
- **Responsive Workspace**: Flexible two-column layout for editing and analysis.
- **Persistence**: All settings, API keys, and JDs saved in `localStorage`.
