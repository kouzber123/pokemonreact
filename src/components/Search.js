import React, { useEffect, useState } from "react";
import axios from "axios";
function Search() {
  var i = 0;
  var test = [];
  var namess = [];
  const [turn, setTurn] = useState(Boolean);
  const [search, setSearch] = useState("");
  const [isSearchOn, setIsSearchOn] = useState(false);
  const [list, setList] = useState([{}]);
  async function handleSubmit(e) {
    const url = `https://pokeapi.co/api/v2/pokemon/${search}`;
    e.preventDefault();
    try {
      await axios.get(url).then(response => {
        if (response) {
          setIsSearchOn(true);
          const data = response.data;
          getSkillSynopsis(data, data.abilities);
        }
      });
    } catch (error) {
      console.log("something happened");
    }
  }
  //this will seperate synopsis data into array
  function getSkillSynopsis(datas, abilitydata) {
    const text = abilitydata;
    var names = text.map(skills => {
      return skills.ability.name;
    });
    namess.push(names);
    console.log(namess);

    var urls = text.map(skills => {
      return skills.ability.url;
    });
    // console.log(datas);
    axios.all(
      urls.map(async url => {
        const d = url;
        return await axios.get(d).then(response => {
          if (response) {
            var res = response.data.flavor_text_entries[0].flavor_text;
            test.push(res);
            console.log(test);
          }

          // console.log(names);

          if (setIsSearchOn) {
            console.log("here aim");
            var j = -1;
            var run = names.map(skill => {
              j++;
              return skill + " " + test[j];
            });
            console.log(run);
            setList([
              {
                id: datas.id,
                name: datas.name,
                abilities: run,
                spriteFront: datas.sprites.front_default,
                spriteBack: datas.sprites.back_default
              }
            ]);
          }
        });
      })
    );
  }
  useEffect(() => {
    console.log(list);
  }, [list]);

  function turnImage() {
    if (turn === true) {
      setTurn(false);
    } else {
      setTurn(true);
    }
  }
  //refactor card into own seperate component
  return (
    <div className="Search">
      <input onChange={e => setSearch(e.target.value)} className="Search-input" type="text" placeholder="Search for pokemon" />
      <button onClick={e => handleSubmit(e)} className="Search-button" type="submit">
        Search
      </button>

      {isSearchOn && (
        <div className="card-holder">
          {list.map(item => {
            return (
              <div key={item.id} className="card">
                <h3 className="card--title">{item.name}</h3>
                {!setIsSearchOn ? (
                  <h1>loading</h1>
                ) : (
                  <div>
                    <img className="card-image" onClick={turnImage} src={turn ? item.spriteBack : item.spriteFront} alt="" />{" "}
                  </div>
                )}

                <dl className="card-skill--list">
                  <dt className="card-skill--title">Skills</dt>
                  {item.abilities.map(skill => {
                    i++;
                    return (
                      <dd key={i} className="card-skill--synopsis first-skill">
                        {skill}
                      </dd>
                    );
                  })}
                </dl>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Search;
