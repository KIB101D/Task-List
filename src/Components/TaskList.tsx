import TaskItem from "./TaskItem";
import Task from "../Types/Task";
import { useTaskContext } from "../hooks/useTaskContext";

function TaskList() {
  const { activeTasks } = useTaskContext();
  return (
    <ul className="task-list">
      {activeTasks.map((task: Task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;
