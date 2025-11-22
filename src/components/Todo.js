import React from "react";
import TodoLists from "./TodoLists";

export default function Todo({ todo, deleteTodo, updatedTodo }) {
  let [isEditing, setIsEditing] = React.useState(false);
  let [editedTitle, setEditedTitle] = React.useState(todo.title);
  let handleEditSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle updating the todo item
    let updatedTodoItem = {
      id: todo.id,
      title: editedTitle,
      completed: todo.completed,
    };
    updatedTodo(updatedTodoItem);
    setIsEditing(false);
  };
  return (
    <li className="todo-item-container">
      <div className="todo-item">
        <input type="checkbox" />
        {!isEditing && (
          <span
            onDoubleClick={() => setIsEditing(true)}
            className={`todo-item-label ${
              todo.completed ? "line-through" : ""
            }`}
          >
            {todo.title}
          </span>
        )}
        {isEditing && (
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              className="todo-item-edit-input"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </form>
        )}
      </div>
      <button className="x-button" onClick={() => deleteTodo(todo)}>
        <svg
          className="x-button-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  );
}
