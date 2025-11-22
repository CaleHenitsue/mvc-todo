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

  let updatedTodo = (updatedTodo) => {
    fetch(`http://localhost:3001/todos/${updatedTodo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
    setTodos((previousState) =>
      previousState.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
    );
  };
  let remainingCount = todos.filter((todo) => !todo.completed).length;
  let checkAll = () => {
    let allCompleted = todos.every((todo) => todo.completed);
    let updatedTodos = todos.map((todo) => ({
      ...todo,
      completed: !allCompleted,
    }));
    updatedTodos.forEach((todo) => {
      fetch(`http://localhost:3001/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
    });
    setTodos(updatedTodos);
  };
  let clearCompleted = () => {
    let completedTodos = todos.filter((todo) => todo.completed);
    completedTodos.forEach((todo) => {
      fetch(`http://localhost:3001/todos/${todo.id}`, {
        method: "DELETE",
      });
    });
    setTodos((previousState) =>
      previousState.filter((todo) => !todo.completed)
    );
  };

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        <TodoLists
          todos={todos}
          deleteTodo={deleteTodo}
          updatedTodo={updatedTodo}
        />
        <CheckAllAndRemaining
          remainingCount={remainingCount}
          checkAll={checkAll}
        />
        <div className="other-buttons-container">
          <TodoFilters />
          <ClearCompletedbtn clearCompleted={clearCompleted} />
        </div>
      </div>
    </div>
  );
}

export default App;
