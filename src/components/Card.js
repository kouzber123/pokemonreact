import React, { useEffect, useState } from "react";
function Card(props) {
  const [turnImage, setTurnImage] = useState(false);
  function change() {
    if (turnImage === true) {
      setTurnImage(false);
    }
    if (turnImage === false) {
      setTurnImage(true);
    }
  }
  return (
    <div className="card-holder">
      {props.pokemon.map(item => {
        return (
          <div key={item.id} className="card">
            <h3 className="card--title">{item.name}</h3>
            {
              <div>
                <img onClick={change} className="card-image" src={turnImage ? item.spriteBack : item.spriteFront} alt="" />{" "}
              </div>
            }

            <dl className="card-skill--list">
              <dt className="card-skill--title">Skills</dt>
              {item.abilities.map(skill => {
                item.i++;
                return (
                  <dd key={item.i} className="card-skill--synopsis first-skill">
                    {skill}
                  </dd>
                );
              })}
            </dl>
          </div>
        );
      })}
    </div>
  );
}

export default Card;
