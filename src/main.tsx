import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TaskProvider } from "./Context/TaskProvider.jsx";

const rootElement = document.getElementById("root");
if (!rootElement) {
  // if root is unavailable (falsy)
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </StrictMode>,
);
