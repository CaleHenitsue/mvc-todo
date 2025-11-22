import React from "react";
import Todo from "../components/Todo.js";

export default function TodoLists({ todos, deleteTodo, updatedTodo }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          updatedTodo={updatedTodo}
        />
      ))}
    </ul>
  );
}
