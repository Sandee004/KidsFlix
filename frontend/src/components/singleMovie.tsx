import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

interface Props {
    movieList: Movie[];
    addFavourite: (updatedMovieList: Movie[]) => void;
}

interface Movie {
    title: string;
    poster_path: string | null;
    overview: string;
    isLiked: boolean;
}

const MovieComponent = ({ movieList, addFavourite }: Props) => {
    //{currentMovies.map((movie, index) => (

    //const addFavourite = (movieIndex: number) => {
    //        setMovieList((prevList) => {
    //          const updatedList = prevList.map((movie, index) => {
    //            if (index === movieIndex) {
    //              return { ...movie, isLiked: !movie.isLiked };
    //        } else {
    //          return movie;
    //    }
    //     });
    //       return updatedList;
    //     });
    //   };

    const handleFavouriteClick = (movieIndex: number) => {
        // Update the movie list with the toggled "isLiked" state
        const updatedMovieList = movieList.map((movie, index) => {
            if (index === movieIndex) {
                return { ...movie, isLiked: !movie.isLiked };
            }
            return movie;
        });

        // Call the prop function (setMovieList) to update state in FetchComponent
        addFavourite(updatedMovieList);
    };
    return (
        <>
            <div className="flex flex-wrap mb-8 rounded-md text-white text-center px-5 flex-row justify-center mt-12">
                {movieList.map((movie, index) => (
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
                                    onClick={() => handleFavouriteClick(index)}
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
        </>
    );
};

export default MovieComponent;
