# React Todo App

A modern, responsive task management application built with **Next.js, React, TypeScript, Tailwind CSS, and shadcn/ui**.

The application allows users to organize their daily tasks, track progress, and manage their to-do lists through a clean and intuitive interface.

## Features

- **Task Management (CRUD)** – Create, view, edit, and delete tasks.
- **Task Completion** – Mark tasks as completed or active.
- **Task Filtering** – Filter tasks by All, Active, or Completed.
- **Task Statistics** – Track total, active, and completed tasks.
- **Local Storage** – Automatically save tasks and restore them after refreshing the page.
- **Dark / Light Mode** – Switch between application themes.
- **Responsive Design** – Layout optimized for desktop and mobile devices.
- **Form Validation** – Prevent creating tasks with empty titles.
- **Delete Confirmation** – Confirm before permanently removing a task.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Application framework and App Router |
| React 19 | Component-based user interface |
| TypeScript | Static typing |
| Tailwind CSS 4 | Styling and responsive layout |
| shadcn/ui | Reusable UI components |
| Base UI | Accessible component primitives |
| Lucide React | Icons |
| next-themes | Theme management |
| localStorage | Browser-based data persistence |

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Szymon1th/react-todo.git
cd react-todo
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the development server**

```bash
npm run dev
```

**4. Open the application**

Visit http://localhost:3000 in your browser.

## Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Create production build
npm run start      # Start production server
npm run lint       # Run ESLint
npx tsc --noEmit   # Check TypeScript types
```

## Project Structure

```text
react-todo/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   └── theme-toggle.tsx
│   ├── theme-provider.tsx
│   └── ui/
│       ├── todo/
│       │   ├── todo-app.tsx
│       │   ├── todo-form.tsx
│       │   ├── todo-list.tsx
│       │   ├── todo-item.tsx
│       │   └── todo-filters.tsx
│       └── ...
├── types/
│   └── types.ts
├── public/
├── package.json
└── README.md
```

## Architecture

The application follows a component-based architecture with centralized task state management.

- **TodoApp** – Manages tasks, filtering, CRUD operations, and localStorage persistence.
- **TodoForm** – Handles task creation and input validation.
- **TodoList** – Renders the task collection.
- **TodoItem** – Displays individual tasks and provides editing, completion, and deletion controls.
- **TodoFilters** – Manages task filtering.
- **ThemeProvider / ThemeToggle** – Provide light and dark theme functionality.

Task data flows from the parent component to child components through props. Child components communicate user actions using callback functions.

## Data Model

Each task contains:

```ts
type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
};
```

## Data Persistence

Tasks are stored in the browser using `localStorage`.

Data is automatically saved when tasks change and restored when the application is reopened or refreshed.

**Note:** This project does not use a backend or database. Tasks are stored locally in the current browser and are not synchronized between devices.

## Future Improvements

- Drag-and-drop task ordering
- Task priorities and deadlines
- Search functionality
- Unit and component tests
- Backend API and database integration
- User authentication and cloud synchronization

## Project Purpose

This project was created to practice React fundamentals, TypeScript, component architecture, state management, React Hooks, browser storage, and modern frontend development with Next.js.

## License

This project is intended for educational and portfolio purposes.