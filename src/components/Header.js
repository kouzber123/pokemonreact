import React, { useEffect } from "react";

function Header() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header--pages">
          <a href="/" rel="noopener noreferrer">
            Home
          </a>
          <a href="/pokemonBook" rel="noopener noreferrer">
            Pokemons
          </a>
          <a href="/myCollection" rel="noopener noreferrer">
            My Collection
          </a>
          <a href="http://" rel="noopener noreferrer">
            Battle ground
          </a>
        </div>
      </header>
    </div>
  );
}

export default Header;
