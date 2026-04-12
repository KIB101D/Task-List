interface Task {
  id: number;
  title: string;
  priority: "Low" | "Medium" | "High";
  deadline: string;
  completed: boolean;
}

export default Task;
