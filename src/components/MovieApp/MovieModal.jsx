import React from "react";

function MovieModal({ movie, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-11/12 md:w-1/2 relative">
        <button
          className="absolute top-2 right-4 text-white text-xl"
          onClick={onClose}
        >
          ✖
        </button>
        <img
          src={movie.poster !== "" ? movie?.poster : "/assets/image1.png"}
          alt={movie.title}
          className="w-full h-72 object-cover rounded"
        />
        <h2 className="text-2xl font-bold mt-4">{movie.title}</h2>
        <p className="text-sm text-gray-400 mt-1">
          ⭐ {movie.rating} | 📅 {movie.releaseDate}
        </p>
        <p className="mt-3 text-gray-300">
          This is a placeholder for the movie description.
        </p>
      </div>
    </div>
  );
}

export default MovieModal;
