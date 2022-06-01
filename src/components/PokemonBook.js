import React, { useEffect, useState } from "react";
import axios from "axios";
function PokemonBook() {
  const [isSearchDone, setIsSearchDone] = useState(Boolean);
  const [list, setList] = useState([]);
  const [name, setName] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [pokemon, setPokemon] = useState([]);

  //first fetch gets the 20 pokemons and its basic data
  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20`;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();

        //put the basic data into array
        setList([json.results]);
        setIsSearchDone(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(list);

  // next get pokemon ability names
  useEffect(() => {
    var nameArray = [];
    const getDetails = async () => {
      try {
        axios.all(
          list[0].map(async url => {
            var u = url.url;
            return axios.get(u).then(response => {
              if (response) {
                const data = response.data;

                axios.all(
                  data.abilities.map(async url => {
                    var skillUrl = url.ability.url;
                    //returns one skill synopsis at the time
                    return axios.get(skillUrl).then(response => {
                      //array
                      if (response) {
                        var res = response.data.flavor_text_entries[1].flavor_text;
                        nameArray.push(res);
                      }

                      // setPokemon(arr => [...arr, newVal]);
                    });
                  })
                );
                //--------

                var d = data.abilities.map(item => {
                  return item.ability.name + " " + nameArray[i];
                });

                // console.log(d);
                setName(arr => [...arr, d]);
                var newVal = {
                  id: data.id,
                  name: data.name,
                  abilities: d,
                  spriteFront: data.sprites.front_default,
                  spriteBack: data.sprites.back_default,
                  i: 0
                };
              }
            });
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
  }, []);
  // console.log(name);
  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}

export default PokemonBook;

//thirdly get summary > meanings of the skills
// const getSkillMeaning = async (data, abilities) => {
//   //get ability names to combine
//   // console.log(data);
//   abilities.map(item => {
//     skill_namess.push(item.ability.name);
//     return item.ability.name;
//   });

//   // console.log(skill_names);
//   try {
//     axios.all(
//       abilities.map(async url => {
//         var skillUrl = url.ability.url;
//         return axios.get(skillUrl).then(response => {
//           if (response) {
//             var res = response.data.flavor_text_entries[1].flavor_text;
//             flavor_skill_text.push(res);
//           }
//           //combine skill name and summary of it
//           var j = -1;
//           var combine_Skill_synopsis = skill_namess.map(skill => {
//             j++;
//             return skill + " " + flavor_skill_text[j];
//           });

//         });
//       })
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };
