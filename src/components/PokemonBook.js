import React, { useEffect, useState } from "react";
import axios from "axios";
function PokemonBook() {
  var flavor_skill_text = [];
  var skill_namess = [];
  const [isSearchDone, setIsSearchDone] = useState(Boolean);
  const [list, setList] = useState([]);

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20`;
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();

        setList([json.results]);
        setIsSearchDone(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(list);

  useEffect(() => {
    //1) get pokemon details
    const getDetails = async () => {
      try {
        axios.all(
          list[0].map(async url => {
            var u = url.url;
            return axios.get(u).then(response => {
              if (response) {
                const data = response.data;
                // console.log(data);
                getSkillMeaning(data.abilities);
              }
            });
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    //get pokemon skill details
    const getSkillMeaning = async data => {
      //get ability names to combine
      // console.log(data);
      var skill_names = data.map(item => {
        skill_namess.push(item.ability.name);
        return item.ability.name;
      });

      // console.log(skill_names);
      try {
        axios.all(
          data.map(async url => {
            var skillUrl = url.ability.url;
            return axios.get(skillUrl).then(response => {
              if (response) {
                var res = response.data.flavor_text_entries[1].flavor_text;
                flavor_skill_text.push(res);
              }
              var j = -1;
              var combine_Skill_synopsis = skill_namess.map(skill => {
                j++;
                return skill + " " + flavor_skill_text[j];
              });
              console.log(combine_Skill_synopsis);
            });
          })
        );
      } catch (error) {
        console.log(error);
      }
    };

    getDetails();
  }, [list, skill_namess, flavor_skill_text]);

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}

export default PokemonBook;
