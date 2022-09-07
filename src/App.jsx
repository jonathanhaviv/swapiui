import "./main.css";

import React, { useState, useEffect } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { CharacterGrid } from "./components/CharacterGrid";
import { SearchBox } from "./components/SearchBox";
import { fetchPaginatedData } from "./utils/fetchPaginatedData";

export const App = () => {
  const [selected, setSelected] = useState("");
  const [characterData, setCharacterData] = useState([]);
  const [planetData, setPlanetData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    if (loading === false) return;

    const api = "https://swapi.dev/api";

    try {
      let peopleData = await fetchPaginatedData(api, "people", 1);

      /* Planet Data. Deciding to pull all the planet data once instead of making individual fetch requests per card. 
      - Allows for reusing the data as a full list easily
      - Avoid fetching the same data twice (could implement a cache)
      Tradeoff: Longer initial load time in favor of faster changes on interactions
      */
      const planetData = await fetchPaginatedData(api, "planets", 1);

      peopleData = peopleData.map((character) => {
        const homeworld = planetData.find(
          (planet) => planet.url === character.homeworld
        );

        character.homeworld = homeworld.name;
        return character;
      });

      setCharacterData(peopleData);
      setPlanetData(planetData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    if (loading === false) return;
    getData().catch((error) => console.error(error));
  });

  return (
    <>
      <h1 className="text-8xl text-center font-black text-white mb-5">
        Star Wars!
      </h1>
      <ErrorBoundary>
        <SearchBox
          values={planetData}
          loading={loading}
          selected={selected}
          setSelected={setSelected}
        />
      </ErrorBoundary>
      <ErrorBoundary>
        <CharacterGrid characterData={characterData} loading={loading} planetFilter={selected}/>
      </ErrorBoundary>
    </>
  );
};
