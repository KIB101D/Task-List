import { useContext } from "react";
import TaskItem from "./TaskItem";
import { TaskContext } from "../Context/TaskProvider";
import Task from "../Types/Task";

function TaskList() {
  const { activeTasks } = useContext(TaskContext);
  return (
    <ul className="task-list">
      {activeTasks.map((task: Task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;
