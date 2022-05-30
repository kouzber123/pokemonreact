import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
function PokemonBook() {
  var flavor_skill_text = [];
  var skill_namess = [];
  const [search, setSearch] = useState("");
  const [isSearchDone, setIsSearchDone] = useState(false);
  const [list, setList] = useState([{}]);
  const [index, setIndex] = useState([]);

  useEffect(() => {
    async function handleApiCall() {
      const url = `https://pokeapi.co/api/v2/pokemon-form/?limit=20&offset=20`;
      try {
        await axios.get(url).then(response => {
          if (response) {
            const data = response.data;
            //forward data
            console.log(data.results);
            //to get results we have to index thro
            console.log(data.results[0].name);
            var l = [];
            l.push(data.results);
            if (data) {
              console.log(l);
              var i = 0;

              console.log(l[0][3]);
            }
          }
        });
      } catch (error) {
        console.log("something happened");
      }
    }

    handleApiCall();
    setIsSearchDone(true);
  }, []);

  useEffect(() => {
    console.log(list);
    console.log(index);
  });
  return (
    <div className="Search">
      <h1>Here pokemons</h1>
    </div>
  );
}

export default PokemonBook;
