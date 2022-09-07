import React from "react";
import { Character } from "./Character";
import { ErrorBoundary } from "./ErrorBoundary";
import { BoltIcon } from "@heroicons/react/24/outline";
import { jaroWinkler } from "../utils/filters";

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
      a.distance = Number(jaroWinkler(peopleFilter, a.name));
      b.distance = Number(jaroWinkler(peopleFilter, b.name));

      if (a.distance === 1) match = a;
      if (b.distance === 1) match = b;

      return b.distance - a.distance;
    });
    else if (peopleFilter === "" && match) match = false;

  const characters =
    match === false ? (
      characterData.map((info) => {
        if (planetFilter !== "" && info.homeworld !== planetFilter) return;
        if (peopleFilter !== "" && info.distance < 0.6) return;
        if (info.distance == 1) match = info;
        return (
          <ErrorBoundary key={info.name}>
            <Character info={info} />
          </ErrorBoundary>
        );
      })
    ) : (
      <ErrorBoundary>
        <Character info={match} />
      </ErrorBoundary>
    );

  return (
    <div className="grid grid-cols-4 gap-y-7 p-5 place-items-center">
      {characters}
    </div>
  );
};
