import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props {
    movieList: Movie[];
    addFavourite: (updatedMovieList: Movie[]) => void;
}

interface Movie {
    title: string;
    poster_path: string | null;
    overview: string;
    isLiked: boolean;
    id: number | string;
}

const MovieComponent = ({ movieList, addFavourite }: Props) => {
    const navigate = useNavigate();
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleFavouriteClick = async (movie: Movie) => {
        const token = localStorage.getItem("token");

        if (!token) {
            setShowLoginModal(true);
            return;
        }

        try {
            await validateToken(token);
            await toogleFavourite(movie);
        } catch (error) {
            console.error("Error handling favourite: ", error);
            alert("Failed to add favourite. Please try again");
        }
    };

    const validateToken = async (token: string) => {
        const response = await fetch("http://localhost:5000/api/check-token", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 401) {
            localStorage.removeItem("token");
            setShowLoginModal(true);
            return;
        }

        if (!response.ok) {
            throw new Error("Failed to check token");
        }
    };

    const toogleFavourite = async (movie: Movie) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(
                "http://localhost:5000/api/toogle_favourites",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        movie_id: movie.id,
                        title: movie.title,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add favorite");
            }

            const result = await response.json();
            const updatedMovieList = movieList.map((m) =>
                m.id === movie.id
                    ? { ...m, isLiked: result.action === "added" }
                    : m
            );
            addFavourite(updatedMovieList);
            alert(result.message);
        } catch (error) {
            console.error("Error adding favorite:", error);
            alert("Failed to add favorite. Please try again.");
        }
    };

    const heartPopAnimation = {
        scale: [1],
        transition: { duration: 0.2 },
    };

    return (
        <>
            <div className="flex flex-wrap mb-8 rounded-md text-white text-center px-5 flex-row justify-center mt-12">
                {movieList.map((movie) => (
                    <div
                        key={movie.title}
                        className="mx-5 bg-[#373b69] mb-5 w-[300px] h-[350px] hover:cursor-pointer hover:underline italic">
                        {movie.poster_path && (
                            <img
                                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-[270px]"
                            />
                        )}
                        <div className="flex justify-between items-center h-[80px]">
                            <h3
                                onClick={() => navigate(`/movies/${movie.id}`)}
                                className="text-[17px] font-bold text-white px-3">
                                {movie.title}
                            </h3>
                            <motion.button
                                animate={
                                    movie.isLiked
                                        ? { scale: 1.3 }
                                        : heartPopAnimation
                                }
                                onClick={() => handleFavouriteClick(movie)}>
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    className={`border-black text-xl mr-5 ${
                                        movie.isLiked
                                            ? "text-red-500"
                                            : "text-white"
                                    }`}
                                />
                            </motion.button>
                        </div>
                    </div>
                ))}
            </div>

            {showLoginModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg">
                        <p>Please log in to add favorites.</p>
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 mr-2">
                            Log In
                        </button>
                        <button
                            onClick={() => setShowLoginModal(false)}
                            className="bg-gray-300 px-4 py-2 rounded mt-4">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default MovieComponent;
