import React from "react";

function MovieCard({
  movie,
  onClick,
  onWatchList,
  onDelete, // new prop for delete functionality
  watchListMovies,
  getButton = false,
  getRemove = false
}) {
  const hasExistMovie = new Set(watchListMovies?.map((item) => item?.id));
  const hasMovieExist = hasExistMovie?.has(movie?.id);

  return (
    <div
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-all cursor-pointer relative"
      onClick={onClick}
    >
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-3">
        <h3 className="text-lg font-bold">{movie.title}</h3>
        <p className="text-sm text-gray-400">
          ⭐ {movie.rating} | 📅 {movie.releaseDate}
        </p>

        {!hasMovieExist && getButton && (
          <button
            className="mt-2 px-3 py-1 text-sm bg-blue-600 rounded hover:bg-blue-700"
            onClick={(e) => {
              e?.stopPropagation();
              onWatchList(movie);
            }}
          >
            + Add to Watchlist
          </button>
        )}

        {hasMovieExist && (
          <div className="mt-2 flex items-center justify-between">
            <p className="text-green-400 text-sm">In Watchlist</p>
          </div>
        )}

        {getRemove && (
          <button
            className="text-red-500 text-sm hover:underline"
            onClick={(e) => {
              e?.stopPropagation();
              onDelete(movie?.id);
            }}
          >
            ❌ Remove
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
