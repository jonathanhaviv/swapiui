import "./main.css";
import React from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { CharacterGrid } from "./components/CharacterGrid";

export const App = () => {
  return (
    <>
    <ErrorBoundary>
      <CharacterGrid />
    </ErrorBoundary>
    </>
  )
}