import { useState, useEffect } from "react";
import MovieComponent from "./singleMovie";

interface Movie {
    title: string;
    poster_path: string | null;
    overview: string;
    isLiked: boolean;
    id: number | string;
}

const FavouritesPage = () => {
    const [favouriteMovies, setFavouriteMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const storedFavourites = localStorage.getItem("favouriteMovies");
        if (storedFavourites) {
            setFavouriteMovies(JSON.parse(storedFavourites));
        }
    }, []);

    const handlePlaceholderFavourite = () => {
        console.log("Movie favourited:"); // Optional for debugging
    };

    return (
        <>
            <p>Favourites</p>
            {favouriteMovies.length > 0 ? (
                <MovieComponent
                    movieList={favouriteMovies}
                    addFavourite={handlePlaceholderFavourite}
                />
            ) : (
                <p>
                    No favourites yet. Add some movies to your favourites list!
                </p>
            )}
        </>
    );
};

export default FavouritesPage;
