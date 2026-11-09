
"use client";

import { useState } from "react";
import type { FormEvent, RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface TodoFormProps {
  onAddTask: (title: string, description?: string) => void;
  inputRef: RefObject<HTMLInputElement | null>;
}

export default function TodoForm({
  onAddTask,
  inputRef,
}: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    onAddTask(trimmedTitle, description.trim());
    setTitle("");
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        ref={inputRef}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What needs to be done?"
        maxLength={120}
        required
      />

      <Textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Description (optional)"
        rows={2}
      />

      <Button type="submit" disabled={!title.trim()}>
        Add Task
      </Button>
    </form>
  );
}
