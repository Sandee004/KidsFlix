import Navbar from "./components/navbar";
import FetchComponent from "./components/FetchComponent";
import MovieDetail from "./components/movieDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FetchComponent />} />
                <Route path="/movies/:id" element={<MovieDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
