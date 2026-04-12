import { useContext, useState } from "react";
import { TaskContext } from "../Context/TaskProvider";

type Priority = "Low" | "Medium" | "High";
type AddTask = (task: {
  title: string;
  priority: Priority;
  deadline: string;
}) => void;

interface TaskContextType {
  addTask: AddTask;
}

function TaskForm() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("TaskContext not found");
  }

  const { addTask }: TaskContextType = context;
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("Low");
  const [deadline, setDeadline] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
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

export default TaskForm;
