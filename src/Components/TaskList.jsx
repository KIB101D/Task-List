import { useContext } from "react";
import TaskItem from "./TaskItem";
import { TaskContext } from "../Context/TaskProvider";

function TaskList() {
  const { activeTasks } = useContext(TaskContext);
  return (
    <ul className="task-list">
      {activeTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;
