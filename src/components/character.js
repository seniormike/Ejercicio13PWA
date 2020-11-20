import React, { useEffect, useState } from "react";

const Character = () => {
  const [character, setCharacter] = useState("");

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("character") === null) {
        setCharacter(null);
      } else {
        setCharacter(JSON.parse(localStorage.getItem("character")));
      }
    } else {
      const URL =
        "https://gateway.marvel.com:443/v1/public/characters?apikey=e481a1705b673bd9fdab494e7636ad32&hash=37d6616b5e5eed054b9bd7541411951e&ts=hola";
      fetch(URL)
        .then((resp) => resp.json())
        .then((resp) => {
          let index = Math.floor(Math.random() * resp.data.count);
          setCharacter(resp.data.results[index]);
          localStorage.setItem("character", JSON.stringify(resp.data.results[index]));
        });
    }
  }, []);
  return (
    <div className="container-fluid">
      {character ? (
        <div>
          <div className="row justify-content-center">
            <div className="col-12">
              <h1 className="my-5 large">{character?.name}</h1>
            </div>
          </div>
          <div className="row mt-4 justify-content-center">
            <div className="col-md-4 m-4">
              <img alt="logo" className="img-fluid" src={character?.thumbnail?.path + "." + character?.thumbnail?.extension} />{" "}
            </div>
            <div className="col-md-7 m-4 text-left">
              <h4>
                <strong>Id: </strong> {character?.id}
              </h4>
              <h4>
                <strong>Description: </strong> {character?.description}
              </h4>
              <h4>
                <strong>Last modified: </strong> {character?.modified}
              </h4>
            </div>
          </div>
        </div>
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-10 mt-5">
            <h1 className="my-5 large">"Error while connecting with API. Try again..."</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Character;
