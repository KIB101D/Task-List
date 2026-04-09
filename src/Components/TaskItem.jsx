import { useContext } from "react";
import { TaskContext } from "../Context/TaskProvider";

function TaskItem({ task }) {
  const { deleteTask, completeTask, timeNow } = useContext(TaskContext);
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
        {!task.completed && (
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

export default TaskItem;
