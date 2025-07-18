# Idioma 🇪🇸🤖

**Idioma** is a language learning app built with React and OpenAI. It allows users to practice Spanish through conversation with an AI assistant and interactive flashcards.

> Built as a practice project to learn React fundamentals, environment management, and working with OpenAI's API.

---

## ✨ Features

- 💬 **AI Spanish Tutor** — Chat with a friendly AI that replies in Spanish with English translations.
- 🧠 **Flashcards** — Reinforce learning with interactive flashcards (WIP or existing).
- 🎨 Sleek UI with Tailwind CSS + Framer Motion animations.
- ☁️ Deployed via **Vercel**.

---

## 📸 Screenshots

_You can add screenshots here later if you'd like. For now, skip this section or add placeholders._

---

## 🚀 Live Demo

🔗 [https://idioma-omega.vercel.app](https://idioma-omega.vercel.app)

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion
- **AI Integration**: OpenAI GPT (via `openai` npm package)
- **Hosting**: Vercel
- **Env Management**: `.env` with Vite prefix (`VITE_`)

---

## 🔧 Getting Started

### 1. Clone the repo

git clone https://github.com/your-username/idioma.git
cd idioma

### 2. Install dependencies
npm install

### 3. Add environment variables
Create .env file in project root and add your OpenAI key
VITE_OPENAI_API_KEY=your_openai_key_here

### 4. Run locally
npm run dev

## 🤖 OpenAI Prompt Behavior
The assistant is configured with this system prompt:

"You are a professional Spanish tutor. You should correct mistakes but not too strict. You should be friendly, encouraging and engaging. Your response should be in Spanish with English translation in brackets."