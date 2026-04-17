import { createContext, useEffect, useState } from "react";
import Task from "../Types/Task";

export type TaskContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;

  openSection: {
    taskList: boolean;
    tasks: boolean;
    completedTaskList: boolean;
  };
  setOpenSection: React.Dispatch<
    React.SetStateAction<{
      taskList: boolean;
      tasks: boolean;
      completedTaskList: boolean;
    }>
  >;

  sortType: string;
  sortOrder: string;
  setSortType: (type: string) => void;

  tick: number;
  setTick: React.Dispatch<React.SetStateAction<number>>;

  toggleSection: (
    sectionName: "taskList" | "tasks" | "completedTaskList",
  ) => void;

  addTask: (task: {
    title: string;
    priority: Task["priority"];
    deadline: string;
  }) => void;

  deleteTask: (id: number) => void;
  completeTask: (id: number) => void;

  completedTasks: Task[];
  activeTasks: Task[];

  sortTask: (tasks: Task[]) => Task[];
  toggleSortOrder: (type: string) => void;

  updateTask: (id: number, updatedData: Partial<Task>) => void;
};

export const TaskContext = createContext<TaskContextType | null>(null);

type ChildrenProps = {
  children: React.ReactNode;
};

export function TaskProvider({ children }: ChildrenProps) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });
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

  function toggleSection(
    sectionName: "taskList" | "tasks" | "completedTaskList",
  ) {
    setOpenSection((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(task: {
    title: string;
    priority: Task["priority"];
    deadline: string;
  }) {
    setTasks([...tasks, { ...task, completed: false, id: Date.now() }]);
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function completeTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task,
      ),
    );
  }

  function sortTask(tasks: Task[]) {
    return tasks.slice().sort((a, b) => {
      if (sortType === "priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return sortOrder === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      } else
        return sortOrder === "asc"
          ? new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          : new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
    });
  }

  function toggleSortOrder(type: string) {
    if (sortType === type) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortType(type);
      setSortOrder("asc");
    }
  }

  function updateTask(id: number, updatedData: Partial<Task>) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedData } : task)),
    );
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
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
