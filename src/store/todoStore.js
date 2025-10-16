import { useState } from 'react';

export function useTodoStore() {
  const [todos, setTodos] = useState([]);

  function addTodo(text) {
    setTodos((prev) => [...prev, { id: Date.now().toString(), text, done: false }]);
  }

  function toggleTodo(id) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function removeTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return { todos, addTodo, toggleTodo, removeTodo };
}


