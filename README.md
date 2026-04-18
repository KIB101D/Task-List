# 📒 Task Manager (React)

A task management app built with React and TypeScript, focused on reusable logic, scalable state management, and clean UX.

---

🎬 Preview

<p align="center"> 
  <img src="./screenshots/appShowcase.gif" width="80%" />
</p>

---

## 🚀 Core Features

* Add / delete / complete tasks
* Inline editing with keyboard support
* Priority system (Low / Medium / High)
* Deadline tracking with real-time overdue detection
* Sorting (by date and priority)
* Task persistence with localStorage

---

## 🧠 Tech Stack

* React (functional components + hooks)
* TypeScript (strong typing for state, context, and component props)
* Context API (state management)
* Vite
* CSS

---

## 🌐 Live Demo

https://task-list-eight-teal.vercel.app/

---

## 🧩 Architecture & Decisions

### ❗ Problem: Prop Drilling

Initially, state and logic were placed inside the main App component.
As the application grew, data had to be passed through multiple levels of components, making the code harder to maintain.

### ✅ Solution: Context API

Moved state logic into a separate provider using the Context API, eliminating unnecessary prop passing and improving scalability.

---

### ❗ Problem: Repetitive Context Usage

Using useContext directly across multiple components led to duplicated logic and repeated null checks.

📸 Before

<p align="center">
  <img src="./screenshots/IMG_5881.PNG" width="40%" />
  <img src="./screenshots/IMG_5880.PNG" width="40%" />
  <img src="./screenshots/IMG_5879.PNG" width="40%" />
</p>

### ✅ Solution: Custom Hook

Extracted context logic into a reusable custom hook:

👉 [useTaskContext hook](https://github.com/KIB101D/Task-List/blob/main/src/hooks/useTaskContext.ts)

Now components can access context cleanly:

```ts
const { addTask } = useTaskContext();
```

🎥 Custom Hook in action

<p align="center"> 
  <img src="./screenshots/customHookUsage.gif" width="70%" /> 
</p>

💡 Instead of repetitive boilerplate — a single clean and reusable solution.

---

### ❗ Problem: Tasks Becoming Outdated

Tasks with deadlines were not updating their status automatically, which could lead to outdated UI.

### ✅ Solution: Timer-driven Updates

Introduced a small time-based state update that triggers a re-render every minute, ensuring overdue tasks are recalculated and reflected in the UI without user interaction.

```ts
useEffect(() => {
  const interval = setInterval(() => {
    setTick((t) => t + 1);
  }, 60000);

  return () => clearInterval(interval);
}, []);
```

🎥 Example

<p align="center">
  <img src="./screenshots/overdue-tick.gif" width="80%" />
</p>

---

## 📦 Installation

```bash
npm install
npm run dev
```
