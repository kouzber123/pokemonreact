import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
function Search() {
  var flavor_skill_text = [];
  var skill_namess = [];
  const [search, setSearch] = useState("");
  const [isSearchDone, setIsSearchDone] = useState(false);
  const [list, setList] = useState([{}]);

  function handleSubmit(e) {
    e.preventDefault();
    handleApiCall();
  }

  async function handleApiCall() {
    const url = `https://pokeapi.co/api/v2/pokemon/${search}`;
    try {
      await axios.get(url).then(response => {
        if (response) {
          const data = response.data;
          //forward data
          getSkillSynopsis(data, data.abilities);
        }
      });
    } catch (error) {
      console.log("something happened");
    }
  }
  //this will seperate synopsis data into array
  function getSkillSynopsis(datas, abilitydata) {
    const skill_text = abilitydata;
    var skill_names = skill_text.map(skills => {
      return skills.ability.name;
    });
    skill_namess.push(skill_names);

    var urls = skill_text.map(skills => {
      return skills.ability.url;
    });

    axios.all(
      urls.map(async url => {
        const d = url;
        return await axios.get(d).then(response => {
          if (response) {
            var res = response.data.flavor_text_entries[0].flavor_text;
            flavor_skill_text.push(res);
          }

          var j = -1;
          var combine_Skill_synopsis = skill_names.map(skill => {
            j++;
            return skill + " " + flavor_skill_text[j];
          });
          setList([
            {
              id: datas.id,
              name: datas.name,
              abilities: combine_Skill_synopsis,
              spriteFront: datas.sprites.front_default,
              spriteBack: datas.sprites.back_default,
              i: 0
            }
          ]);
          setIsSearchDone(true);
        });
      })
    );
  }
  return (
    <div className="Search">
      <input onChange={e => setSearch(e.target.value)} className="Search-input" type="skill_text" placeholder="Search for pokemon" />
      <button onClick={e => handleSubmit(e)} className="Search-button" type="submit">
        Search
      </button>

      {isSearchDone && <Card pokemon={list} />}
    </div>
  );
}

export default Search;
