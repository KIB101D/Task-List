import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [openSection, setOpenSection] = useState({
    taskList: false,
    tasks: true,
    completedTaskList: true,
  });
  const [sortType, setSortType] = useState("date"); // priority
  const [sortOrder, setSortOrder] = useState("asc"); // desc
  const [timeNow, setTimeNow] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const formatted = date.toLocaleString();
      setTimeNow(formatted);
      console.log(formatted);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function toggleSection(sectionName) {
    setOpenSection((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  }

  function addTask(task) {
    setTasks([...tasks, { ...task, completed: false, id: Date.now() }]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function completeTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task,
      ),
    );
  }

  function sortTask(tasks) {
    return tasks.slice().sort((a, b) => {
      if (sortType === "priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return sortOrder === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      } else
        return sortOrder === "asc"
          ? new Date(a.deadline) - new Date(b.deadline)
          : new Date(b.deadline) - new Date(a.deadline);
    });
  }

  function toggleSortOrder(type) {
    if (sortType === type) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortType(type);
      setSortOrder("asc");
    }
  }

  const activeTasks = sortTask(tasks.filter((task) => !task.completed));
  const completedTasks = tasks.filter((task) => task.completed);

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
        {openSection.taskList && <TaskForm addTask={addTask} />}
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
        {openSection.tasks && (
          <TaskList
            deleteTask={deleteTask}
            completeTask={completeTask}
            activeTasks={activeTasks}
            timeNow={timeNow}
          />
        )}
      </div>

      <div className="completed-task-container">
        <h2>Completed Tasks</h2>
        <button
          className={`close-button ${openSection.completedTaskList ? "open" : ""}`}
          onClick={() => toggleSection("completedTaskList")}
        >
          +
        </button>
        {openSection.completedTaskList && (
          <CompletedTaskList
            deleteTask={deleteTask}
            completedTasks={completedTasks}
            timeNow={timeNow}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [deadline, setDeadline] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() && deadline) {
      addTask({ title, priority, deadline });
      setTitle("");
      setPriority("Low");
      setDeadline("");
    }
  }

  return (
    <form action="" className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        placeholder="Task title"
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="datetime-local"
        required
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit">Add task</button>
    </form>
  );
}

function TaskList({ activeTasks, deleteTask, completeTask, timeNow }) {
  return (
    <ul className="task-list">
      {activeTasks.map((task) => (
        <TaskItem
          deleteTask={deleteTask}
          completeTask={completeTask}
          task={task}
          key={task.id}
          timeNow={timeNow}
        />
      ))}
    </ul>
  );
}

function CompletedTaskList({ deleteTask, completedTasks, timeNow }) {
  return (
    <ul className="completed-task-list">
      {completedTasks.map((task) => (
        <TaskItem
          deleteTask={deleteTask}
          task={task}
          key={task.id}
          timeNow={timeNow}
        />
      ))}
    </ul>
  );
}

function TaskItem({ task, deleteTask, completeTask, timeNow }) {
  const { title, priority, deadline, id } = task;
  const isOverdue = timeNow > new Date(deadline).toLocaleString();

  return (
    <li
      className={`task-item ${priority.toLowerCase()} ${isOverdue ? "overdue" : ""}`}
    >
      <div className="task-info">
        <div>
          {title} <strong>{priority}</strong>
        </div>
        <div className="task-deadline">
          Due:{" "}
          {isOverdue ? (
            <s>{new Date(deadline).toLocaleString()}</s>
          ) : (
            new Date(deadline).toLocaleString()
          )}
        </div>
      </div>
      <div className="task-buttons">
        {completeTask && (
          <div className="complete-button" onClick={() => completeTask(id)}>
            Complete
          </div>
        )}
        <div className="delete-button" onClick={() => deleteTask(id)}>
          Delete
        </div>
      </div>
    </li>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>
        Technologies and React concepts used: React, JSX, props, useState,
        component composition, conditional rendering, array methods (map,
        filter), event handling.
      </p>
    </footer>
  );
}

export default App;
