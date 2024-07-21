import { useEffect, useState } from "react";
import MovieComponent from "./singleMovie";

interface Movie {
    title: string;
    poster_path: string | null;
    overview: string;
    isLiked: boolean;
}

const FetchComponent = () => {
    const apiKey = "ceba03f56c18f997a242eb118d552605";
    const [movieList, setMovieList] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 12;

    useEffect(() => {
        getAnimationMovies();
    }, []);

    const getAnimationMovies = async () => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=16`
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch movies: ${response.statusText}`
                );
            }
            const data = await response.json();
            const moviesWithLikedStatus = data.results.map((movie: Movie) => ({
                ...movie,
                isLiked: false,
            }));

            setMovieList(moviesWithLikedStatus);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movieList.slice(indexOfFirstMovie, indexOfLastMovie);

    const totalPages = Math.ceil(movieList.length / moviesPerPage);

    return (
        <>
            <MovieComponent
                movieList={currentMovies}
                addFavourite={(updatedMovieList) =>
                    setMovieList(updatedMovieList)
                }
            />
            {totalPages > 1 && (
                <div>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}>
                        Previous Page
                    </button>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}>
                        Next Page
                    </button>
                </div>
            )}
        </>
    );
};

export default FetchComponent;
