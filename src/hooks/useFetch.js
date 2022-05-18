import { useReducer, useEffect, useContext, useState } from "react";
import { CacheContext } from "../context/CacheContext";

const initialState = { loading: false, data: null, error: null };

const fetchReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOAD':
      return { ...state, loading: true, data: null, error: null };
    case 'SUCCESS':
      return { ...state, loading: false, data: payload, error: null };
    case 'FAILURE':
      return { ...state, loading: false, data: null, error: payload };
    default:
      return state;
  }
};

const useFetch = (fetchResource, param) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const cache = useContext(CacheContext);

  useEffect(() => {

    if (cache.state[param]) {
      dispatch({ type: 'SUCCESS', payload: cache.state[param] });
      return;
    }

    const fetch = async () => {
  
      dispatch({ type: 'LOAD' });
      try {
        const resource = await fetchResource(param);
        dispatch({ type: 'SUCCESS', payload: resource });
        cache.dispatch({ type: 'SET_CACHE', payload: { key: param, value: resource } });
      } catch (error) {
        dispatch({ type: 'FAILURE', payload: error });
      }
    }
    fetch();

  }, [fetchResource, param, cache]);

  return state;
};

export default useFetch;
