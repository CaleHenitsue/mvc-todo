import "./reset.css";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoLists from "./components/TodoLists";
import CheckAllAndRemaining from "./components/CheckAllAndRemaining";
import TodoFilters from "./components/TodoFilters";
import ClearCompletedbtn from "./components/ClearCompletedbtn";
import { useEffect, useState } from "react";

function App() {
  let [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
  }, []);

  let addTodo = (todo) => {
    fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    setTodos((previousState) => [...previousState, todo]);
  };

  let deleteTodo = (todo) => {
    fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: "DELETE",
    });
    setTodos((previousState) => previousState.filter((t) => t.id !== todo.id));
  };

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        <TodoLists todos={todos} deleteTodo={deleteTodo} />
        <CheckAllAndRemaining />
        <div className="other-buttons-container">
          <TodoFilters />
          <ClearCompletedbtn />
        </div>
      </div>
    </div>
  );
}

export default App;
