
import type { Task } from "@/types/types";
import TodoItem from "./todo-item";

interface TodoListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, title: string, description: string) => void;
}

export default function TodoList({
  tasks,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}: TodoListProps) {
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      ))}
    </ul>
  );
}
