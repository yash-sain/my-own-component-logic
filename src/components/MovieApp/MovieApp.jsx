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
  {
    id: 11,
    title: "The Godfather",
    poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    rating: 9.2,
    releaseDate: "1972-03-24",
  },
  {
    id: 12,
    title: "The Godfather Part II",
    poster: "https://image.tmdb.org/t/p/w500/bVq65huQ8vHDd1a4Z37QtuyEvpA.jpg",
    rating: 9.0,
    releaseDate: "1974-12-20",
  },
  {
    id: 13,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    poster: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    rating: 8.8,
    releaseDate: "2001-12-19",
  },
  {
    id: 14,
    title: "The Lord of the Rings: The Two Towers",
    poster: "https://image.tmdb.org/t/p/w500/rrGlNlzFTrXFNGXsD7NNlxq4BPb.jpg",
    rating: 8.7,
    releaseDate: "2002-12-18",
  },
  {
    id: 15,
    title: "The Lord of the Rings: The Return of the King",
    poster: "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
    rating: 8.9,
    releaseDate: "2003-12-17",
  },
  {
    id: 16,
    title: "The Prestige",
    poster: "https://image.tmdb.org/t/p/w500/5MXyQfz8xUP3dIFPTubhTsbFY6N.jpg",
    rating: 8.5,
    releaseDate: "2006-10-20",
  },
  {
    id: 17,
    title: "Joker",
    poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    rating: 8.5,
    releaseDate: "2019-10-04",
  },
  {
    id: 18,
    title: "Whiplash",
    poster: "https://image.tmdb.org/t/p/w500/oPxnRhyAIzJKGUEdSiwTJQBa5T.jpg",
    rating: 8.5,
    releaseDate: "2014-10-10",
  },
  {
    id: 19,
    title: "Parasite",
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    rating: 8.6,
    releaseDate: "2019-05-30",
  },
  {
    id: 20,
    title: "Django Unchained",
    poster: "https://image.tmdb.org/t/p/w500/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg",
    rating: 8.4,
    releaseDate: "2012-12-25",
  },
  {
    id: 21,
    title: "The Wolf of Wall Street",
    poster: "https://image.tmdb.org/t/p/w500/pWHf4khOloNVfCxscsXFj3jj6gP.jpg",
    rating: 8.2,
    releaseDate: "2013-12-25",
  },
  {
    id: 22,
    title: "Titanic",
    poster: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    rating: 7.9,
    releaseDate: "1997-12-19",
  },
  {
    id: 23,
    title: "Avengers: Infinity War",
    poster: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    rating: 8.4,
    releaseDate: "2018-04-27",
  },
  {
    id: 24,
    title: "Iron Man",
    poster: "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
    rating: 7.9,
    releaseDate: "2008-05-02",
  },
  {
    id: 25,
    title: "Captain America: The Winter Soldier",
    poster: "https://image.tmdb.org/t/p/w500/tVFRpFw3xTedgPGqxW0AOI8Qhh0.jpg",
    rating: 7.7,
    releaseDate: "2014-04-04",
  },
  {
    id: 26,
    title: "Black Panther",
    poster: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",
    rating: 7.3,
    releaseDate: "2018-02-16",
  },
  {
    id: 27,
    title: "Deadpool",
    poster: "https://image.tmdb.org/t/p/w500/inVq3FRqcYIRl2la8iZikYYxFNR.jpg",
    rating: 8.0,
    releaseDate: "2016-02-12",
  },
  {
    id: 28,
    title: "Logan",
    poster: "https://image.tmdb.org/t/p/w500/fnbjcRDYn6YviCcePDnGdyAkYsB.jpg",
    rating: 8.1,
    releaseDate: "2017-03-03",
  },
  {
    id: 29,
    title: "Mad Max: Fury Road",
    poster: "https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
    rating: 8.1,
    releaseDate: "2015-05-15",
  },
  {
    id: 30,
    title: "The Social Network",
    poster: "https://image.tmdb.org/t/p/w500/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg",
    rating: 7.7,
    releaseDate: "2010-10-01",
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
              getButton={true}
              onWatchList={watchlistData}
              watchListMovies={watchListMovies}
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
            onWatchList={watchlistData}
            watchListMovies={watchListMovies}
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
