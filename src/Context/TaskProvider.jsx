import { createContext, useEffect, useState } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [openSection, setOpenSection] = useState({
    taskList: false,
    tasks: true,
    completedTaskList: true,
  });
  const [sortType, setSortType] = useState("date"); // priority
  const [sortOrder, setSortOrder] = useState("asc"); // desc
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 60000); // 1 minute

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
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        openSection,
        setOpenSection,
        sortType,
        sortOrder,
        setSortType,
        tick,
        setTick,
        toggleSection,
        addTask,
        deleteTask,
        completeTask,
        completedTasks,
        sortTask,
        toggleSortOrder,
        activeTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
