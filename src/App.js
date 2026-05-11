import React, { useState } from "react";

export default function TodoApp() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (task.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTask("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  return (
    <div style={styles.container}>
      <h1>ToDo List</h1>

      <div style={styles.inputBlock}>
        <input
          type="text"
          placeholder="Введите задачу..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={styles.input}
        />

        <button onClick={addTodo} style={styles.addButton}>
          Добавить
        </button>
      </div>

      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id} style={styles.todoItem}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                ...styles.todoText,
                textDecoration: todo.completed
                  ? "line-through"
                  : "none",
                opacity: todo.completed ? 0.5 : 1,
              }}
            >
              {todo.text}
            </span>

            <button
              onClick={() => deleteTodo(todo.id)}
              style={styles.deleteButton}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontFamily: "Arial",
  },

  inputBlock: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
  },

  addButton: {
    padding: "10px 15px",
    cursor: "pointer",
  },

  list: {
    listStyle: "none",
    padding: 0,
  },

  todoItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #eee",
  },

  todoText: {
    cursor: "pointer",
    fontSize: "18px",
  },

  deleteButton: {
    background: "transparent",
    border: "none",
    color: "rgb(255, 0, 0)",
    cursor: "pointer",
    fontSize: "18px",
  },
};