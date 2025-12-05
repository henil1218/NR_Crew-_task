import { Todo } from "../types";

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function TodoList({ todos, onToggle, onRemove }: TodoListProps) {
  if (todos.length === 0) {
    return <p className="text-center text-muted mt-3">Nothing to do yet.</p>;
  }

  return (
    <ul className="list-group mt-3">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="list-group-item d-flex align-items-center justify-content-between"
        >
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={todo.done}
              id={`todo-${todo.id}`}
              onChange={() => onToggle(todo.id)}
            />
            <label
              htmlFor={`todo-${todo.id}`}
              className={`form-check-label ${todo.done ? "text-decoration-line-through text-muted" : ""
                }`}
            >
              {todo.text}
            </label>
          </div>
          <button
            className="btn btn-outline-danger btn-sm"
            type="button"
            onClick={() => onRemove(todo.id)}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}

