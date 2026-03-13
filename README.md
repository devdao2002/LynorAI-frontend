# LynorAI Copilot Studio — Frontend

A **Microsoft Copilot Studio–style** React chatbot interface for the LynorAI Enterprise RAG Assistant. Built with Vite + React, featuring a Teams-inspired dark UI, real-time SSE streaming, drag-and-drop PDF upload, and integration guides for Microsoft Teams, Power Apps, and Web Chat.

---

## Getting Started

### Prerequisites
- Node.js 18+
- Spring Boot backend running on port `8080` (see [`LynorAI-backend`](https://github.com/devdao2002/LynorAI-backend/))

### Install & Run

```bash
npm install
npm run dev        # → http://localhost:3000
```

Vite proxies all `/api/*` requests to the Spring Boot backend automatically.

### Production Build

```bash
npm run build      # Output → frontend/dist/
```

---

## Features

| Pane | What it does |
|---|---|
| **Chat** | Bubble-style conversation, real-time SSE token streaming, source citation pills, typing indicator, Enter-to-send |
| **Documents** | Drag-and-drop PDF upload, ingestion progress tracking, per-tenant isolation |
| **Integrations** | Setup guides + copy-able code snippets for **Teams**, **Power Apps**, and **Web Chat** |
| **Settings** | Sandbox session token, rate limits, auto-cleanup policy, version & tech stack info |

---

## Project Structure

```
src/
├── App.jsx                 # Root shell — tab routing, all hooks wired
├── App.css                 # Design system — Teams palette, Inter font, CSS vars
├── main.jsx
├── api/
│   └── client.js           # Fetch + SSE helpers, sandbox token (localStorage)
├── hooks/
│   ├── useBootstrap.js     # GET /api/bootstrap + live sandbox countdown
│   ├── useChat.js          # SSE streaming message state
│   └── useDocuments.js     # Upload + poll /api/documents/status/:id
└── components/
    ├── TopBar.jsx           # Logo, "ENTERPRISE RAG ASSISTANT", sandbox badge
    ├── Sidebar.jsx          # Icon nav (Chat / Documents / Integrations / Settings)
    ├── ChatPane.jsx         # Chat bubbles, typing dots, auto-scroll, citations
    ├── DocumentPane.jsx     # Drag-and-drop zone, upload list with status badges
    ├── IntegrationPane.jsx  # Expandable cards: Teams · Power Apps · Web Chat
    └── SettingsPane.jsx     # Sandbox info, rate limits, version, tech stack
```

---

## Backend API

All requests include `X-Sandbox-Token` header for multi-tenant isolation.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/bootstrap` | Init session, get sandbox token & limits |
| `POST` | `/api/documents/upload` | Upload a PDF for ingestion |
| `GET` | `/api/documents/status/:id` | Poll document processing status |
| `GET` | `/api/ask/stream?question=…` | SSE streaming RAG answer |

---

## Integrations

### Microsoft Teams
Register an [Azure Bot](https://portal.azure.com/), add the Teams channel, and upload the app manifest via the [Teams Developer Portal](https://dev.teams.microsoft.com/).

### Power Apps
Wrap the chat in a [PCF component](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/overview) and import the solution into your Power Platform environment.

### Web Chat (iframe embed)
```html
<iframe
  src="https://lynorai.space"
  style="position:fixed;bottom:24px;right:24px;width:380px;height:560px;
         border:none;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,.3);"
  title="LynorAI Copilot">
</iframe>
```

---

## Design System

- **Color palette** — Teams-inspired dark: `#1a1a2e` base · `#6264A7` accent · `#9EA8DB` light accent
- **Typography** — [Inter](https://fonts.google.com/specimen/Inter) (UI) · [DM Mono](https://fonts.google.com/specimen/DM+Mono) (code/tokens)
- **Patterns** — Glassmorphism cards · CSS custom properties · Micro-animations

---

## Tech Stack

`React 18` · `Vite 7` · `Vanilla CSS` · `Spring Boot 3` · `Spring AI` · `OpenAI GPT` · `pgvector`
