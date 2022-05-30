import "./App.css";
import Header from "./components/Header";
import HomeUser from "./components/homeUser";
import PokemonCollection from "./components/PokemonCollection";
import PokemonBook from "./components/PokemonBook";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomeUser />} />
        <Route path="/pokemonBook" element={<PokemonBook />} />
        <Route path="/myCollection" element={<PokemonCollection />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
