
"use client";

import { Button } from "@/components/ui/button";

export type TaskFilter = "all" | "active" | "completed";

interface TodoFiltersProps {
  value: TaskFilter;
  onChange: (filter: TaskFilter) => void;
}

const filters: { label: string; value: TaskFilter }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

export default function TodoFilters({
  value,
  onChange,
}: TodoFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Task filters">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          type="button"
          variant={value === filter.value ? "default" : "outline"}
          aria-pressed={value === filter.value}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
