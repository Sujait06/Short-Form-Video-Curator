import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [tag, setTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(tag);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search tag (AI, Python...)"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;