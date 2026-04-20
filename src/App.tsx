import { useState } from "react";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import CompletedTaskList from "./Components/CompletedTaskList";
import { EmptyState } from "./Components/EmptyState";
import Footer from "./Components/Footer";
import { useTaskContext } from "./hooks/useTaskContext";
import { useTasksView } from "./hooks/useTasksView";
import FilterControls from "./Components/FilterControls";
import SortControls from "./Components/SortControls";

export type Filter = "all" | "active" | "completed";

function App() {
  const { openSection, toggleSection, completedTasks, activeTasks } =
    useTaskContext();

  const [filter, setFilter] = useState<Filter>("all");

  const view = useTasksView({
    filter,
    activeCount: activeTasks.length,
    completedCount: completedTasks.length,
  });

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

        <FilterControls filter={filter} setFilter={setFilter} />

        {filter !== "completed" && <SortControls />}

        {openSection.tasks && (
          <>
            {view.showEmptyAll && (
              <>
                <div className="completed-divider" />
                <EmptyState
                  title="No tasks yet"
                  subtitle="Add your first task to get started"
                />
              </>
            )}

            {view.showEmptyActive && <EmptyState title="No active tasks" />}

            {view.showEmptyCompleted && (
              <EmptyState title="No completed tasks yet" />
            )}

            {view.showActive && <TaskList />}

            {view.showCompleted && (
              <>
                <div className="completed-divider" />
                <CompletedTaskList />
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
