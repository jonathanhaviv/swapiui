import React from "react";
import { Character } from "./Character";
import { ErrorBoundary } from "./ErrorBoundary";
import { BoltIcon } from "@heroicons/react/24/outline";
import { stringDistance } from "../utils/filters";

export const CharacterGrid = ({
  characterData,
  loading,
  planetFilter,
  peopleFilter,
}) => {
  let match = false;

  if (loading === true) {
    return (
      <p className="text-white font-black text-center mt-3 animate-pulse">
        Loading... <BoltIcon className="inline-flex w-6 h-7 stroke-2" />
      </p>
    );
  }

  if (peopleFilter !== "")
    characterData.sort((a, b) => {
      a.distance = stringDistance(peopleFilter, a.name);
      b.distance = stringDistance(peopleFilter, b.name);

      if (a.distance === 0) match = a;
      if (b.distance === 0) match = b;

      return a.distance - b.distance;
    });

  const characters = characterData.map((info) => {
    if (planetFilter !== "" && info.homeworld !== planetFilter) return;
    if (peopleFilter !== "" && info.distance < 0.6) return;

    return (
      <ErrorBoundary key={info.name}>
        <Character info={info} />
      </ErrorBoundary>
    );
  });

  return (
    <div className="grid grid-cols-4 gap-y-7 p-5 place-items-center">
      {match === false ? (
        characters
      ) : (
        <ErrorBoundary>
          <Character info={match} />
        </ErrorBoundary>
      )}
    </div>
  );
};
