import FetchComponent from "./components/FetchComponent";
import MovieDetail from "./components/movieDetail";
import FavouritesPage from "./components/favouritesPage";
import LoginPage from "./components/login";
import RegisterPage from "./components/register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FetchComponent />} />
                <Route path="/movies/:id" element={<MovieDetail />} />
                <Route path="/favourites" element={<FavouritesPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}

export default App;
