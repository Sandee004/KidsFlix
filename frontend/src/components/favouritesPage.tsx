import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Movie {
    title: string;
    id: number | string;
}

const FavouritesPage = () => {
    const [favouriteMovies, setFavouriteMovies] = useState<Movie[]>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLogin = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setIsLoggedIn(false);
                return;
            }

            try {
                const validationResponse = await fetch(
                    "http://localhost:5000/api/check-token",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!validationResponse.ok) {
                    if (validationResponse.status === 401) {
                        localStorage.removeItem("token");
                        setIsLoggedIn(false);
                        return;
                    }
                    throw new Error("Failed to validate token");
                }

                setIsLoggedIn(true);
                getFavourites();
            } catch (error) {
                console.error("Error:", error);
                setIsLoggedIn(false);
            }
        };

        checkLogin();
    }, []);

    const getFavourites = async () => {
        const token = localStorage.getItem("token");

        try {
            const favouritesResponse = await fetch(
                "http://localhost:5000/api/favourites",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!favouritesResponse.ok) {
                throw new Error(
                    `Failed to fetch movies: ${favouritesResponse.statusText}`
                );
            }

            const data = await favouritesResponse.json();
            setFavouriteMovies(data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    if (isLoggedIn === null) {
        return <p>Loading...</p>;
    }

    if (!isLoggedIn) {
        return (
            <div>
                <p>
                    You are not logged in. Please log in to see your favourites.
                </p>
                <button onClick={() => navigate("/login")}>Log In</button>
            </div>
        );
    }

    return (
        <>
            <div className="bg-[#373b69] text-white px-5 py-2 mb-5">
                <p className="text-2xl text-center">Favourites</p>
            </div>
            {favouriteMovies.length > 0 ? (
                <div>
                    {favouriteMovies.map((movie) => (
                        <div
                            key={movie.id}
                            className="border-2 border-[#22254b] w-[85%] rounded-sm px-5 py-6 mx-auto">
                            <h3>{movie.title}</h3>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No favourites added.</p>
            )}
        </>
    );
};

export default FavouritesPage;
