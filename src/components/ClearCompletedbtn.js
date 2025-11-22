import React from "react";

export default function ClearCompletedbtn({ clearCompleted }) {
  return (
    <div>
      <button className="button" onClick={clearCompleted}>
        Clear completed
      </button>
    </div>
  );
}
