import React, { useEffect, useState } from "react";
import { fetchPaginatedData } from "../utils/fetchPaginatedData";
import { Character } from "./Character";
import { ErrorBoundary } from "./ErrorBoundary";

export const CharacterGrid = () => {
  const [ characterData, setCharacterData ] = useState([]);

  // todo - update logic for homeworld url to homeworld name to implement the filter
  const [ planetFilter, setPlanetFilter ] = useState('');
  const [ loading, setLoading ] = useState(true);

  const getData = async () => {
    if (loading === false) return;

    const api = "https://swapi.dev/api";

    try {
      const peopleData = await fetchPaginatedData(api, "people", 1);
      

      setCharacterData(peopleData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  useEffect(() => {
    if (loading === true) {
      getData().catch(error => console.error(error));
    }
  })

  if (loading === true) {
    return (
      <p>Loading...</p>
    )
  }

  return (
    <>
      {characterData.map(info => {
        return (
          <ErrorBoundary key={info.name}>
            <Character info={info} />
          </ErrorBoundary>
        )
      })}
    </>
  )
}