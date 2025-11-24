import React, { useEffect } from "react";

export default function TodoFilters({ filterBy }) {
  const [filter, setFilter] = React.useState("All");

  useEffect(() => {
    filterBy(filter);
  }, [filter, filterBy]);

  const filters = ["All", "Active", "Completed"];

  return (
    <div>
      {filters.map((filterType) => (
        <button
          key={filterType}
          className={`button filter-button ${
            filter === filterType ? "filter-button-active" : ""
          }`}
          onClick={() => setFilter(filterType)}
        >
          {filterType}
        </button>
      ))}
    </div>
  );
}
