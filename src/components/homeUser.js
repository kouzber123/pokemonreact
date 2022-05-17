import React, { useEffect } from "react";
import Search from "./Search";

function HomeUser() {
  return (
    <div className="HomeUser">
      <h3 className="Home-user--title">In here you can search for any pokemon you like! 🦌🦏🦇🦍🦊</h3>
      <Search />
    </div>
  );
}

export default HomeUser;
