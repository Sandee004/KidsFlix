import { useEffect, useState } from "react";

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
        getFavourites();
    }, []);

    const getFavourites = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/api/favourites"
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch movies: ${response.statusText}`
                );
            }
            const data = await response.json();
            setFavouriteMovies(data);
        } catch (error) {
            console.error("Error fetching favourites");
        }
    };
    return (
        <>
            <p>Favourites</p>
            {favouriteMovies.length > 0 ? (
                <div>
                    {favouriteMovies.map((movie) => (
                        <div key={movie.id}>
                            <h3>{movie.title}</h3>
                            {movie.poster_path && (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-[270px]"
                                />
                            )}

                            <p>{movie.overview}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No favourites found.</p>
            )}
        </>
    );
};

export default FavouritesPage;
