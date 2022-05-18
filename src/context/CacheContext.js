import React, { createContext, useEffect, useReducer } from "react";

export const CacheContext = createContext();

const cacheReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_CACHE':
      return { ...state, [payload.key]: payload.value };
    default:
      return state;
  }
};

export const CacheProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cacheReducer, JSON.parse(localStorage.getItem('POKEAPI_CACHE')) || {});

  useEffect(() => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('POKEAPI_CACHE', serializedState);
  }, [state]);

  return <CacheContext.Provider value={{state, dispatch}}>{children}</CacheContext.Provider>;
}
