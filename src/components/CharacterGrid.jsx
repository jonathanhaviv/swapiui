import React, { useEffect, useState } from "react";
import { fetchPaginatedData } from "../utils/fetchPaginatedData";
import { Character } from "./Character";
import { ErrorBoundary } from "./ErrorBoundary";
import { BoltIcon } from "@heroicons/react/24/outline";


export const CharacterGrid = () => {
  const [characterData, setCharacterData] = useState([]);

  // todo - update logic for homeworld url to homeworld name to implement the filter
  const [planetFilter, setPlanetFilter] = useState("");
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
      setLoading(false);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    if (loading === true) {
      getData().catch((error) => console.error(error));
    }
  });

  if (loading === true) {
    return (
      <p className="text-white font-black text-center mt-3 animate-pulse">
        Loading... <BoltIcon className="inline-flex w-6 h-7 stroke-2" />
      </p>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-y-7 p-5 place-items-center">
      {characterData.map((info) => {
        if (planetFilter !== "" && info.homeworld !== planetFilter) return;

        return (
          <ErrorBoundary key={info.name}>
            <Character info={info} />
          </ErrorBoundary>
        );
      })}
    </div>
  );
};
