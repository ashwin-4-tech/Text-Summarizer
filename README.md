# 📝 AI Text Summarizer (Full-Stack)

A modern web application that transforms unstructured, messy text into structured, actionable insights using the **Llama 3.3 70B** model.

## ✨ Features

  - **Intelligent Summarization:** Generates a concise, one-sentence summary.
  - **Key Point Extraction:** Identifies exactly 3 critical takeaways from any text.
  - **Sentiment Analysis:** Detects the emotional tone (Positive, Neutral, or Negative).
  - **Glassmorphism UI:** A sleek, dark-mode React interface with real-time loading states.

-----

## 🚀 Setup & Installation

### 1\. Prerequisites

  - Node.js installed on your machine.
  - A free API key from [Groq Cloud](https://www.google.com/search?q=https://console.groq.com/).

### 2\. Backend Setup

```bash
cd server
npm install
```

  - Create a `.env` file in the `server` folder:

<!-- end list -->

```env
GROQ_API_KEY=your_key_here
PORT=3000
```

  - Start the engine:

<!-- end list -->

```bash
node src/index.js
```

### 3\. Frontend Setup

```bash
cd client
npm install
npm run dev
```

  - Open `http://localhost:5173` in your browser.

-----

## 🧠 Design Decisions & Architecture

### **Why the Backend?**

I chose to process LLM calls through a Node.js/Express proxy instead of calling the API directly from React. This ensures that the **API Key remains secure** on the server side and is never exposed in the user's browser "Network" tab.

### **Prompt Engineering**

To guarantee a "kick-ass" output, I used a **System Prompt** that enforces a strict JSON schema.

  - **Technique:** I utilized `response_format: { type: "json_object" }` to ensure the model never returns conversational filler, only raw data that the frontend can parse reliably.

### **Handling Real-World Challenges**

During development, the original Llama 3 8B model was decommissioned by the provider. I successfully identified the `400 Bad Request` error in the server logs and performed a **live migration to Llama 3.3 70B**, restoring service and actually improving the summary quality.

-----

## 🛠 Tech Stack

  - **Frontend:** React.js, Axios, CSS-in-JS.
  - **Backend:** Node.js, Express, OpenAI SDK (Groq-compatible).
  - **LLM:** Llama 3.3 70B via Groq (chosen for sub-second inference speeds).
