
"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Task } from "@/types/types";
import TodoForm from "./todo-form";
import TodoList from "./todo-list";
import TodoFilters, { type TaskFilter } from "./todo-filters";

const STORAGE_KEY = "react-todo-tasks";

const subscribe = () => () => {};

function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}

function isTask(value: unknown): value is Task {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.completed === "boolean" &&
    typeof item.createdAt === "string" &&
    (item.description === undefined ||
      typeof item.description === "string")
  );
}

function loadTasks(): Task[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isTask);
  } catch (error) {
    console.error("Failed to load tasks:", error);
    return [];
  }
}

export default function TodoApp() {
  const mounted = useIsClient();

  const [filter, setFilter] = useState<TaskFilter>("all");

  const inputRef = useRef<HTMLInputElement>(null);

  return mounted ? (
    <TodoAppContent
      initialTasks={loadTasks()}
      inputRef={inputRef}
      filter={filter}
      onFilterChange={setFilter}
    />
  ) : (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:py-16">
      <p className="text-center text-muted-foreground">
        Loading tasks...
      </p>
    </main>
  );
}

interface TodoAppContentProps {
  initialTasks: Task[];
  inputRef: React.RefObject<HTMLInputElement | null>;
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}

function TodoAppContent({
  initialTasks,
  inputRef,
  filter,
  onFilterChange,
}: TodoAppContentProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks:", error);
    }
  }, [tasks]);

  function handleAddTask(title: string, description?: string): void {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);

    inputRef.current?.focus();
  }

  function handleToggleTask(id: string): void {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  }

  function handleDeleteTask(id: string): void {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  }

  function handleEditTask(
    id: string,
    title: string,
    description: string
  ): void {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title,
              description,
            }
          : task
      )
    );
  }

  const totalCount = tasks.length;

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const activeCount = totalCount - completedCount;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10 sm:py-16">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          My Tasks
        </h1>

        <p className="mt-2 text-muted-foreground">
          Organize your day, one task at a time.
        </p>
      </header>

      <TodoForm
        onAddTask={handleAddTask}
        inputRef={inputRef}
      />

      <section className="mt-8 grid grid-cols-3 gap-3">
        {[
          { label: "Total", value: totalCount },
          { label: "Active", value: activeCount },
          { label: "Completed", value: completedCount },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border bg-card p-4 text-center"
          >
            <p className="text-2xl font-bold">
              {stat.value}
            </p>

            <p className="text-xs text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      <div className="mt-8">
        <TodoFilters
          value={filter}
          onChange={onFilterChange}
        />
      </div>

      {filteredTasks.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed p-10 text-center">
          <p className="font-medium">
            No tasks to display
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            {filter === "all"
              ? "Add your first task to get started."
              : "There are no tasks matching this filter."}
          </p>
        </div>
      ) : (
        <div className="mt-6">
          <TodoList
            tasks={filteredTasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
          />
        </div>
      )}
    </main>
  );
}
