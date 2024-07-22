import { useEffect, useState } from "react";
import Navbar from "./navbar";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

interface Movie {
    title: string;
    poster_path: string | null;
    overview: string;
    isLiked: boolean;
    id: number | string;
}

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const apiKey = "ceba03f56c18f997a242eb118d552605";

    const receivedID = id;

    useEffect(() => {
        const fetchMovieDetail = async () => {
            const response = await fetch(
                //`https://api.themoviedb.org/3/movie/{movie_id}?api_key=${apiKey}/${id}`
                `https://api.themoviedb.org/3/movie/${receivedID}?api_key=${apiKey}`
            );
            const data = await response.json();
            //console.log(data);
            setMovie(data);
        };
        fetchMovieDetail();
    }, [id]);

    if (!movie) {
        return <p>Loading movie details...</p>;
    }

    return (
        <>
            <Navbar />
            <div className="bg-white w-[85%] text-black mx-auto py-8 flex flex-col md:flex-row justify-center items-center px-8 gap-8 my-10">
                <div className="bg-red-400 w-[300px] h-[320px]">
                    <img
                        src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                        alt={movie.title}
                        className="border-white border-4 w-full h-full"
                    />
                </div>
                <div className="md:w-2/3">
                    <p className="text-2xl font-bold sm:text-3xl">
                        {movie.title}
                    </p>
                    <p>{movie.overview}</p>
                    <div className="my-5">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            initial={{ scale: 1 }}
                            className="bg-red-500 px-4 rounded-sm mr-5 py-1">
                            Watch Now
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            initial={{ scale: 1 }}
                            className="bg-slate-300 rounded-sm px-2 py-1 text-black">
                            Add to Favourites
                        </motion.button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieDetail;
