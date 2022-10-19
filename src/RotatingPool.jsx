import React, { memo, useEffect, useState } from "react";
import { POOL_SIZE, ROTATE_TIME } from "./App";

export const RotatingPool = memo(({ pool }) => {
  const [currentPool, setCurrentPool] = useState(pool);

  useEffect(() => {
    setCurrentPool((currentPool) => [
      ...currentPool.slice(0, POOL_SIZE),
      ...pool,
    ]);
  }, [pool]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPool((currentPool) => {
        const newPool = currentPool.slice(1);
        return newPool.length >= POOL_SIZE ? newPool : [...newPool, ...pool];
      });
    }, ROTATE_TIME);
    return () => clearInterval(interval);
  }, [pool]);

  return (
    <div className="list-container">
      {currentPool.slice(0, POOL_SIZE).map((item, i) => (
        <div key={i} className="list-element">
          {item}
        </div>
      ))}
    </div>
  );
});
