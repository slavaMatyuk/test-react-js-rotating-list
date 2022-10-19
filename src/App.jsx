import React, { useEffect, useState, useDeferredValue } from "react";
import { RotatingPool } from "./RotatingPool";
import { getCollectionNames } from "./getCollectionNames";

export const INITIAL_POOL = ["A", "B", "C", "D", "E"];
export const POOL_SIZE = 5;
export const ROTATE_TIME = 1000;

export const App = () => {
  const [selectedPool, setSelectedPool] = useState(INITIAL_POOL);
  const [searchValue, setSearchValue] = useState("");

  const deferredSearch = useDeferredValue(searchValue);

  useEffect(() => {
    if (deferredSearch.length > 1) {
      getCollectionNames(deferredSearch).then((names) => {
        if (names.length > 0) {
          setSelectedPool(Array.from(new Set(names)).slice(0, POOL_SIZE));
        }
      });
    }
  }, [deferredSearch]);

  const handleSearchChange = (event) => setSearchValue(event.target.value);

  return (
    <div className="app">
      <div className="container">
        <h3>Rotating List</h3>
        <input
          className="search"
          placeholder="Search Band"
          minLength={2}
          value={deferredSearch}
          onChange={handleSearchChange}
        />
        <RotatingPool pool={selectedPool} />
      </div>
    </div>
  );
};
