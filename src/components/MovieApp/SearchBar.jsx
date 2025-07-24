import React from "react";

function SearchBar({ searchMovie, setSearchMovie }) {
  return (
    <div className="flex justify-center mb-6">
      <input
        id="search-movie"
        name="search-movie"
        type="text"
        className="w-full md:w-1/2 px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
        placeholder="Search for a movie..."
        onChange={(e) => setSearchMovie(e?.target?.value)}
        value={searchMovie}
      />
    </div>
  );
}

export default SearchBar;
