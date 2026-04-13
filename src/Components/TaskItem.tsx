import Task from "../Types/Task";
import { useTaskContext } from "../hooks/useTaskContext";

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  const { deleteTask, completeTask } = useTaskContext();
  const { title, priority, deadline, id } = task;
  const isOverdue = new Date() > new Date(deadline);

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
