import React, { useEffect, useState } from "react";
import axios from "axios";
function Search() {
  var i = 0;
  const [search, setSearch] = useState("");
  const [isSearchOn, setIsSearchOn] = useState(false);
  const [list, setList] = useState([{}]);
  const [synopsis, setSynopsis] = useState([]);
  async function handleSubmit(e) {
    const url = `https://pokeapi.co/api/v2/pokemon/${search}`;
    e.preventDefault();
    try {
      await axios.get(url).then(response => {
        if (response) {
          setIsSearchOn(true);
          const data = response.data;
          getSkillSynopsis(data.abilities);
        }
      });
    } catch (error) {
      console.log("something happened");
    }
  }
  //this will seperate synopsis data into array
  function getSkillSynopsis(data) {
    console.log(data);
    const text = data;
    var names = text.map(skills => {
      return skills.ability.name;
    });
    var urls = text.map(skills => {
      return skills.ability.url;
    });
    // console.log(urls);
    // console.log(names);

    return axios.all(
      urls.map(url => {
        const d = url;
        return axios.get(d).then(response => {
          // console.log(response.data);
          var res = response.data.flavor_text_entries[0].flavor_text;
          console.log(res);
        });
      })
    );

    //     setSynopsis(res);
    //     setList({
    //       synopsis: [...synopsis, synopsis]
    //     });
    //   );

    // console.log(list);
  }
  return (
    <div className="Search">
      <input onChange={e => setSearch(e.target.value)} className="Search-input" type="text" placeholder="Search for pokemon" />
      <button onClick={e => handleSubmit(e)} className="Search-button" type="submit">
        Search
      </button>

      {isSearchOn && <div className="card-holder"></div>}
    </div>
  );
}

export default Search;
