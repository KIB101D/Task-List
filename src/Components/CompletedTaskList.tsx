import TaskItem from "./TaskItem";
import Task from "../Types/Task";
import { useTaskContext } from "../hooks/useTaskContext";

function CompletedTaskList() {
  const { completedTasks } = useTaskContext();
  return (
    <ul className="completed-task-list">
      {completedTasks.map((task: Task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default CompletedTaskList;
