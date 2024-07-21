import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

interface Movie {
    title: string;
    poster_path: string | null;
    overview: string;
    isLiked: boolean;
}

const APIComponent = () => {
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

    const addFavourite = (movieIndex: number) => {
        setMovieList((prevList) => {
            const updatedList = prevList.map((movie, index) => {
                if (index === movieIndex) {
                    return { ...movie, isLiked: !movie.isLiked };
                } else {
                    return movie;
                }
            });
            return updatedList;
        });
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
            <div className="flex flex-wrap mb-8 rounded-md text-white text-center px-5 flex-row justify-center mt-12">
                {currentMovies.map((movie, index) => (
                    <div
                        key={movie.title}
                        className="mx-5 bg-[#373b69] mb-5 w-[300px] h-[350px]">
                        {movie.poster_path && (
                            <img
                                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-[270px]"
                            />
                        )}
                        <div className="flex justify-between items-center h-[80px]">
                            <h3 className="text-[17px] font-bold text-white px-3">
                                {movie.title}
                            </h3>
                            <button>
                                <FontAwesomeIcon
                                    onClick={() => addFavourite(index)}
                                    icon={faHeart}
                                    className={`border-black text-xl mr-5 ${
                                        movie.isLiked
                                            ? "text-red-500"
                                            : "text-white"
                                    }`}
                                />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
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

export default APIComponent;
