import { useContext } from "react";
import TaskItem from "./TaskItem";
import { TaskContext } from "../Context/TaskProvider";

function CompletedTaskList() {
  const { completedTasks } = useContext(TaskContext);
  return (
    <ul className="completed-task-list">
      {completedTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default CompletedTaskList;
