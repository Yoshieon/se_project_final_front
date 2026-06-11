import { useState } from "react";
import "./SearchFrom.css";

export default function SearchFrom({ onSearch }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setError("Please enter a keyword");
      return;
    }

    setError("");
    onSearch(trimmedQuery);
  };

  return (
    <div className="search-block">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="search"
          placeholder="Enter topic"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            if (error) setError("");
          }}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <p className="search-error">{error}</p>}
    </div>
  );
}
