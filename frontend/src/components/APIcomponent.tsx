import { useEffect, useState } from "react";

interface Movie {
  title: string;
  poster_path: string | null;
  overview: string;
  // Add more properties as needed
}

const APIComponent = () => {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const apiKey = 'ceba03f56c18f997a242eb118d552605'; // Replace with your actual API key
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=16`
    );

      if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
      }
      const data = await response.json();
      setMovieList(data.results as Movie[]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handlePageChange = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movieList.slice(indexOfFirstMovie, indexOfLastMovie);

  const totalPages = Math.ceil(movieList.length / moviesPerPage);

  return (
    <>
    <div className="flex flex-wrap justify-between mb-8 rounded-md text-white text-center px-5">
      {currentMovies.map((movie) => (
        <div key={movie.title} className="w-full sm:w-1/3 md:w-1/4 border-purple-200 border-2 rounded-sm mb-3">
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
              className="mx-auto w-full"
            />
          )}
          <div className="bg-purple-300 w-full h-[200px] sm:h-fit items-center py-2 px-3">
            <p>{movie.title}</p>
            <p>{movie.overview}</p>
          </div>
        </div>
      ))}
      {totalPages > 1 && (
        <div>
          <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
            Previous Page
          </button>
          <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
            Next Page
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default APIComponent;
