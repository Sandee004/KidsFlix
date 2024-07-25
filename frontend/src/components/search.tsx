import { useState, useEffect } from "react";

interface Movie {
    id: number | string;
    title: string;
}
const SearchComponent = () => {
    const apiKey = "ceba03f56c18f997a242eb118d552605";
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<Movie[]>([]);

    const handleSearchChange = (e: any) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!searchTerm) {
            return;
        }

        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setSearchResults(data.results);
        } catch (error) {
            console.error(error);
            <p className="italic text-sm text-center">Movie not found</p>;
        }
    };

    useEffect(() => {
        // Optional: Clear search results if search term becomes empty
        if (!searchTerm) {
            setSearchResults([]);
        }
    }, [searchTerm]);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="bg-gray-300 h-[28px] px-2 italic text-black focus:outline-2 focus:outline-[#373b69]"
                        placeholder="Search"
                    />
                </div>

                {searchResults.length > 0 && (
                    <ul>
                        {searchResults.map((movie) => (
                            <li key={movie.id}>{movie.title}</li>
                        ))}
                    </ul>
                )}
            </form>
        </>
    );
};

export default SearchComponent;
