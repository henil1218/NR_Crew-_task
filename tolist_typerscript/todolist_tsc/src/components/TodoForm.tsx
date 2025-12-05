import { FormEvent, useState } from "react";

type TodoFormProps = {
  onAdd: (text: string) => void;
};

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(text);
    setText("");
  };

  return (
    <form className="d-flex gap-2" onSubmit={handleSubmit}>
      <input
        className="form-control"
        type="text"
        placeholder="Add a new task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="btn btn-primary" type="submit" disabled={!text.trim()}>
        Add
      </button>
    </form>
  );
}

