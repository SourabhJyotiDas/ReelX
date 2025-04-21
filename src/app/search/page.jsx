"use client";

import { useState } from "react";
import SuggestedAccounts from "../../components/Suggestion-User";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    // TODO: Replace this with real API logic
    const dummyData = ["apple", "banana", "grape", "orange", "peach"];
    const filtered = dummyData.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
  };

  return (
    <div className="min-h-screen bg-white text-black p-6 max-w-md mx-auto">
      <form onSubmit={handleSearch} className="space-y-4">
        <input
          type="text"
          placeholder="Type to search..."
          className="w-full border p-2 rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:opacity-90">
          Search
        </button>
      </form>

      {results.length > 0 && (
        <ul className="mt-6 space-y-2">
          {results.map((item, index) => (
            <li
              key={index}
              className="bg-gray-100 p-2 rounded shadow-sm hover:bg-gray-200">
              {item}
            </li>
          ))}
        </ul>
      )}

      {results.length === 0 && query && (
        <p className="text-sm text-center mt-4 text-gray-700">
          No results found.
        </p>
      )}

      <SuggestedAccounts
        suggestions={[
          {
            id: "1",
            name: "John Doe",
            username: "johndoe",
          },
          {
            id: "2",
            name: "Jane Smith",
            username: "janesmith",
          },
        ]}
      />
    </div>
  );
};

export default SearchComponent;
