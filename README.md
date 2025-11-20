
# ⚡ VibeCoder: Multimodal Agentic UI Generator

<div align="center">
  <img src="https://placehold.co/900x200/2a0e42/00c8ff?text=VibeCoder+%E2%80%94+Multimodal+Agentic+UI+Generator" alt="Project Banner Placeholder" />
  <p>A demonstration of combining visual sketches and text prompts to autonomously generate code using Gemini 3.</p>
</div>

## 🎯 Project Overview: The Agentic Leap

**VibeCoder** is an advanced application that showcases the next generation of AI development: **Agentic Workflow**.

It is built to solve the complex problem of translating messy, high-level human ideas—like a sketch and a creative brief—into precise, runnable code artifacts.

This project is a high-value demonstration of technical skill in three critical areas:

1.  **Multimodal Fusion:** Combining multiple data types (image and text) in a single request for cohesive reasoning.
2.  **Autonomous Code Synthesis:** Using the LLM as a developer agent to generate a complete, deployable front-end UI.
3.  **Production Reliability:** Implementing robust engineering practices to handle cloud service volatility.

---

## 🛠️ Technical Architecture & Features

### 1. Multimodal Agent Workflow
The application is structured to force the Gemini model into an advanced reasoning loop:

| Step | Component | Technical Detail |
| :--- | :--- | :--- |
| **Input Fusion** | Frontend (`App.tsx`) | Sends an asynchronous request containing two data parts: 1) A Base64-encoded **Image** (the sketch) and 2) A **Text Prompt** (the 'vibe' and constraints). |
| **Deep Reasoning** | Gemini Model (via API) | The agent is explicitly configured to use a **high-level thinking process** (`thinking_level: 'HIGH'`) to analyze the sketch's layout while strictly adhering to text constraints (e.g., "Use Synthwave aesthetic"). |
| **Artifact Generation**| Gemini Output | The model outputs *only* a single, complete HTML document containing all necessary Tailwind CSS and JavaScript, which is ready for deployment. |
| **Live Rendering** | PreviewFrame | The generated HTML is safely rendered in an isolated `<iframe>` for an instant preview. |

### 2. Production Reliability: Exponential Backoff

To ensure a professional and robust user experience, especially when dealing with high-demand models like Gemini, the API service layer includes built-in retry logic.

* **Problem Addressed:** Transient service errors (e.g., `503 UNAVAILABLE`) caused by high server load.
* **Solution:** The core service logic implements **Exponential Backoff** logic. If a temporary error occurs, the system automatically retries the API call up to five times, waiting exponentially longer between attempts. This prevents application failure and ensures task completion.

### 3. Technology Stack
* **Agent Model:** Gemini 2.5/3 (via `@google/genai`)
* **Frontend Framework:** React / TypeScript
* **Styling:** Tailwind CSS
* **Build Tool:** Vite (for modern, fast development)

---

## 🚀 How to Run Locally

### Prerequisites
* Node.js (v18+)
* A Gemini API Key (set in the environment variables)

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/dineshabey/vibe-coder-agentic-ui-generator.git]
    cd Gemini-3-Vibe-Coder-Agent
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Set API Key:**
    Create a file named `.env.local` in the root directory and add your key:
    ```
    VITE_GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```
4.  **Run the Application:**
    ```bash
    npm run dev
    ```
    The application will open in your browser (e.g., `http://localhost:5173`).

---

