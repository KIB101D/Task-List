import { useState } from "react";
import { TaskContextType } from "../Context/TaskProvider";
import { useTaskContext } from "../hooks/useTaskContext";

type Priority = "Low" | "Medium" | "High";

function TaskForm() {
  const { addTask }: TaskContextType = useTaskContext();
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
