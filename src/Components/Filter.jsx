import React from "react";

const Filter = ({ filter, setFilter }) => {
  return (
    <div className="flex gap-2 mb-4">
      <button
        className={`p-2 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={`p-2 rounded ${filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => setFilter("active")}
      >
        Active
      </button>
      <button
        className={`p-2 rounded ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
};

export default Filter;
