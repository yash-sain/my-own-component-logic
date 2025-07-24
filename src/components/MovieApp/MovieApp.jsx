import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";
import MovieModal from "./MovieModal";

const mockMovies = [
  {
    id: 1,
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    rating: 8.8,
    releaseDate: "2010-07-16",
  },
  {
    id: 2,
    title: "Interstellar",
    poster: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    rating: 8.6,
    releaseDate: "2014-11-07",
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    rating: 9.0,
    releaseDate: "2008-07-18",
  },
  {
    id: 4,
    title: "Avengers: Endgame",
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    rating: 8.4,
    releaseDate: "2019-04-26",
  },
  {
    id: 5,
    title: "The Matrix",
    poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    rating: 8.7,
    releaseDate: "1999-03-31",
  },
  {
    id: 6,
    title: "Fight Club",
    poster: "https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
    rating: 8.8,
    releaseDate: "1999-10-15",
  },
  {
    id: 7,
    title: "Pulp Fiction",
    poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    rating: 8.9,
    releaseDate: "1994-10-14",
  },
  {
    id: 8,
    title: "The Shawshank Redemption",
    poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    rating: 9.3,
    releaseDate: "1994-09-23",
  },
  {
    id: 9,
    title: "Forrest Gump",
    poster: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
    rating: 8.8,
    releaseDate: "1994-07-06",
  },
  {
    id: 10,
    title: "Gladiator",
    poster: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    rating: 8.5,
    releaseDate: "2000-05-05",
  },
];

function MovieApp() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [searchMovie, setSearchMovie] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [watchListMovies, setWatchListMovies] = useState(() => {
    const storedValue = JSON.parse(localStorage.getItem("watchlist"));
    return storedValue?.length > 0 ? storedValue : [];
  });

  useEffect(() => {
    if (mockMovies) {
      const filtered = mockMovies.filter((item) =>
        item?.title?.toLowerCase().includes(searchMovie?.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  }, [searchMovie, mockMovies]);

  const watchlistData = (movie) => {
    setWatchListMovies((prev) => [...prev, movie]);
  };

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchListMovies));
  }, [watchListMovies]);

  const handleRemoveMovie = (id) => {
    const deleteMoview = watchListMovies?.filter((movie) => movie?.id !== id);
    setWatchListMovies(deleteMoview);
  };

  console.log(watchListMovies);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">🎬 Movie Explorer</h1>

      <SearchBar searchMovie={searchMovie} setSearchMovie={setSearchMovie} />

      {filteredMovies?.length > 0 && (
        <h2 className="text-xl font-semibold mt-6 mb-2">Results</h2>
      )}
      {filteredMovies?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredMovies?.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => {
                setSelectedMovie(movie);
              }}
              onWatchList={watchlistData}
              watchListMovies={watchListMovies}
              getButton={true}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-[300px] flex items-center justify-center">
          <p>No Movies Found...</p>
        </div>
      )}

      {watchListMovies?.length > 0 && (
        <h2 className="text-xl font-semibold mt-10 mb-2">Your Watchlist</h2>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Use same MovieCard here, maybe with "Remove" instead of "Add" button */}
        {watchListMovies?.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            getRemove={true}
            onDelete={handleRemoveMovie}
          />
        ))}
      </div>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default MovieApp;
