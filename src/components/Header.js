import React, { useEffect } from "react";

function Header() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-header--pages">
          <a href="http://" target="_blank" rel="noopener noreferrer">
            Home
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            My Collection
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            Battle ground
          </a>
        </div>
      </header>
    </div>
  );
}

export default Header;
