import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import CompletedTaskList from "./Components/CompletedTaskList";
import Footer from "./Components/Footer";
import { useTaskContext } from "./hooks/useTaskContext";

function App() {
  const { openSection, toggleSection, sortOrder, sortType, toggleSortOrder } =
    useTaskContext();
  return (
    <div className="app">
      <div className="task-container">
        <h1>Task List with priority</h1>
        <button
          className={`close-button ${openSection.taskList ? "open" : ""}`}
          onClick={() => toggleSection("taskList")}
        >
          +
        </button>
        {openSection.taskList && <TaskForm />}
      </div>

      <div className="task-container">
        <h2>Tasks</h2>
        <button
          className={`close-button ${openSection.tasks ? "open" : ""}`}
          onClick={() => toggleSection("tasks")}
        >
          +
        </button>
        <div className="sort-controls">
          <button
            className={`sort-button ${sortType === "date" ? "active" : ""}`}
            onClick={() => toggleSortOrder("date")}
          >
            By Date{" "}
            {sortType === "date" && (sortOrder === "asc" ? "\u2191" : "\u2193")}
          </button>
          <button
            className={`sort-button ${sortType === "priority" ? "active" : ""}`}
            onClick={() => toggleSortOrder("priority")}
          >
            By Priority{" "}
            {sortType === "priority" &&
              (sortOrder === "asc" ? "\u2191" : "\u2193")}
          </button>
        </div>
        {openSection.tasks && <TaskList />}
      </div>

      <div className="completed-task-container">
        <h2>Completed Tasks</h2>
        <button
          className={`close-button ${openSection.completedTaskList ? "open" : ""}`}
          onClick={() => toggleSection("completedTaskList")}
        >
          +
        </button>
        {openSection.completedTaskList && <CompletedTaskList />}
      </div>

      <Footer />
    </div>
  );
}

export default App;
