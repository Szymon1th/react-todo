
"use client";

import { useState } from "react";
import type { Task } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2 } from "lucide-react";

interface TodoItemProps {
  task: Task;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (id: string, title: string, description: string) => void;
}

export default function TodoItem({
  task,
  onToggleTask,
  onDeleteTask,
  onEditTask,
}: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");

  function saveEdit() {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onEditTask(task.id, trimmedTitle, description.trim());
    setEditing(false);
  }

  function cancelEdit() {
    setTitle(task.title);
    setDescription(task.description ?? "");
    setEditing(false);
  }

  return (
    <li className="rounded-xl border bg-card p-4">
      {editing ? (
        <div className="space-y-3">
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={120}
            aria-label="Edit task title"
          />

          <Textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            aria-label="Edit task description"
          />

          <div className="flex gap-2">
            <Button onClick={saveEdit} disabled={!title.trim()}>
              Save
            </Button>
            <Button variant="outline" onClick={cancelEdit}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggleTask(task.id)}
            aria-label={`Mark ${task.title} as ${
              task.completed ? "active" : "completed"
            }`}
            className="mt-1"
          />

          <div className="min-w-0 flex-1">
            <p
              className={
                task.completed
                  ? "break-words text-muted-foreground line-through"
                  : "break-words font-medium"
              }
            >
              {task.title}
            </p>

            {task.description && (
              <p className="mt-1 whitespace-pre-wrap break-words text-sm text-muted-foreground">
                {task.description}
              </p>
            )}

            <p className="mt-2 text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Edit ${task.title}`}
              onClick={() => setEditing(true)}
            >
              <Pencil className="size-4" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Delete ${task.title}`}
                  />
                }
              >
                <Trash2 className="size-4" />
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this task?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDeleteTask(task.id)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
    </li>
  );
}
