import React, { useEffect } from "react";
import { use } from "react";

export default function TodoFilters({ filterBy }) {
  let [filter, setFilter] = React.useState("All");
  useEffect(() => {
    filterBy(filter);
  }, [filter]);

  return (
    <div>
      <button
        className={`button filter-button ${
          filter === "All" ? "filter-button-active" : ""
        }`}
        onClick={() => setFilter("All")}
      >
        All
      </button>
      <button
        className={`button filter-button ${
          filter === "Active" ? "filter-button-active" : ""
        }`}
        onClick={() => setFilter("Active")}
      >
        Active
      </button>
      <button
        className={`button filter-button ${
          filter === "Completed" ? "filter-button-active" : ""
        }`}
        onClick={() => setFilter("Completed")}
      >
        Completed
      </button>
    </div>
  );
}
