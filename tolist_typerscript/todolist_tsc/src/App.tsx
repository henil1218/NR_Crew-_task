import { useMemo, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { Todo } from "./types";

const initialTodos: Todo[] = [];

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const completedCount = useMemo(
    () => todos.filter((todo) => todo.done).length,
    [todos]
  );

  const addTodo = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const next: Todo = {
      id: crypto.randomUUID(),
      text: trimmed,
      done: false,
    };

    setTodos((prev) => [next, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="h3 mb-4 text-center">Todo List</h1>
              <TodoForm onAdd={addTodo} />
              <div className="d-flex justify-content-between align-items-center mt-3">
                <small className="text-muted">
                  Total: {todos.length} &middot; Completed: {completedCount}
                </small>
              </div>
              <TodoList todos={todos} onToggle={toggleTodo} onRemove={removeTodo} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

