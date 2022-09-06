import "./main.css";
import React from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { CharacterGrid } from "./components/CharacterGrid";

export const App = () => {
  return (
    <>
      <h1 className="text-8xl text-center font-black text-white mb-5">
        Star Wars!
      </h1>
      <ErrorBoundary>
        <CharacterGrid />
      </ErrorBoundary>
    </>
  );
}