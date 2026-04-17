import { useState } from "react";
import Task from "../Types/Task";
import { useTaskContext } from "../hooks/useTaskContext";

interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  const { deleteTask, completeTask, updateTask } = useTaskContext();

  const { title, priority, deadline, id } = task;
  const isOverdue = new Date() > new Date(deadline);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);

  function handleSave() {
    if (!value.trim()) return;
    updateTask(id, { title: value });
    setIsEditing(false);
  }

  return (
    <li
      className={`task-item ${priority.toLowerCase()} ${isOverdue ? "overdue" : ""}`}
    >
      <div className="task-info">
        <div>
          {isEditing ? (
            <input
              className="edit-input"
              value={value}
              size={Math.max(value.length, 1)}
              autoFocus
              onChange={(e) => setValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") {
                  setValue(title);
                  setIsEditing(false);
                }
              }}
            />
          ) : (
            <span onClick={() => setIsEditing(true)}>{title}</span>
          )}{" "}
          <strong>{priority}</strong>
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
