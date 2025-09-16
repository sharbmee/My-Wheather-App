import React, { useState } from "react";

export default function SearchScreen({ onSearch, onBack }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city.trim());
    setCity("");
  };

  return (
    <div className="search-screen card p-4 shadow-lg">
      {/* Back Button */}
      <button
        className="btn btn-sm btn-outline-secondary mb-3"
        onClick={onBack}
      >
        ← Back
      </button>

      <h2 className="mb-3">🔎 Search / Change City</h2>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name (e.g., London)"
        />
        <button type="submit" className="btn btn-primary">
          Get Weather
        </button>
      </form>

      <p className="text-muted">
        💡 Tip: Use exact city name for best results.
      </p>
    </div>
  );
}
