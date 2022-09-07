import React, { useEffect, useState } from "react";
import { fetchPaginatedData } from "../utils/fetchPaginatedData";
import { Character } from "./Character";
import { ErrorBoundary } from "./ErrorBoundary";
import { BoltIcon } from "@heroicons/react/24/outline";


export const CharacterGrid = ({ characterData, loading }) => {
  // todo - update logic for homeworld url to homeworld name to implement the filter
  const [planetFilter, setPlanetFilter] = useState("");

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
