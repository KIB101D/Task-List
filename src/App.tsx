import { useState } from "react";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import CompletedTaskList from "./Components/CompletedTaskList";
import Footer from "./Components/Footer";
import { useTaskContext } from "./hooks/useTaskContext";

type Filter = "all" | "active" | "completed";

function App() {
  const {
    openSection,
    toggleSection,
    sortOrder,
    sortType,
    toggleSortOrder,
    completedTasks,
    activeTasks,
  } = useTaskContext();

  const [filter, setFilter] = useState<Filter>("all");

  return (
    <div className="app">
      <div className="task-container">
        <h1>Task Manager</h1>
        <button
          className={`close-button ${openSection.taskList ? "open" : ""}`}
          onClick={() => toggleSection("taskList")}
        >
          +
        </button>
        {openSection.taskList && <TaskForm />}
      </div>

      <div className="task-container">
        <h2>
          {filter === "all"
            ? "Tasks"
            : filter === "active"
              ? "Active Tasks"
              : "Completed Tasks"}
        </h2>

        <button
          className={`close-button ${openSection.tasks ? "open" : ""}`}
          onClick={() => toggleSection("tasks")}
        >
          +
        </button>

        <div className="filter-controls">
          <button
            className={`filter-button ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={`filter-button ${filter === "active" ? "active" : ""}`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>

          <button
            className={`filter-button ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        {filter !== "completed" && (
          <div className="sort-controls">
            <button
              className={`sort-button ${sortType === "date" ? "active" : ""}`}
              onClick={() => toggleSortOrder("date")}
            >
              By Date{" "}
              {sortType === "date" &&
                (sortOrder === "asc" ? "\u2191" : "\u2193")}
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
        )}

        {openSection.tasks && (
          <>
            {filter === "all" && (
              <>
                {/* Empty state */}
                {activeTasks.length === 0 && completedTasks.length === 0 && (
                  <>
                    <div className="completed-divider" />

                    <div className="empty-state">
                      <p className="empty-title">No tasks yet</p>
                      <p className="empty-subtitle">
                        Add your first task to get started
                      </p>
                    </div>
                  </>
                )}

                {/* Only completed */}
                {activeTasks.length === 0 && completedTasks.length > 0 && (
                  <>
                    <div className="completed-divider" />
                    <CompletedTaskList />
                  </>
                )}

                {/* Active */}
                {activeTasks.length > 0 && (
                  <>
                    <TaskList />

                    {completedTasks.length > 0 && (
                      <>
                        <div className="completed-divider" />
                        <CompletedTaskList />
                      </>
                    )}
                  </>
                )}
              </>
            )}

            {filter === "active" && (
              <>
                {activeTasks.length === 0 ? (
                  <div className="empty-state">
                    <p className="empty-title">No active tasks</p>
                  </div>
                ) : (
                  <TaskList />
                )}
              </>
            )}

            {filter === "completed" && (
              <>
                {completedTasks.length === 0 ? (
                  <div className="empty-state">
                    <p className="empty-title">No completed tasks yet</p>
                  </div>
                ) : (
                  <CompletedTaskList />
                )}
              </>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
