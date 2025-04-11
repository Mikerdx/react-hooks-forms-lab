import React from "react";

function Filter({ search, onSearchChange }) {
  function handleChange(e) {
    onSearchChange(e.target.value);
  }

  return (
    <input
      type="text"
      placeholder="Search"
      value={search}
      onChange={handleChange}
    />
  );
}

export default Filter;
