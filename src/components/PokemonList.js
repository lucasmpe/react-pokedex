import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from "@emotion/styled";
import pokeapi from '../api/pokemon.js';
import useFetch from '../hooks/useFetch';
import Pagination from './Pagination.js';
import Loading from './Loading.js';

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 4rem);
  grid-gap: 5px;
  margin: auto 10rem;
  justify-items: center;
  align-items: stretch;
`;

const ListItem = styled.div`
  display: flex;
  background: #808080f2;
  border: none;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  padding: 5px;
  max-width: 200px;
  letter-spacing: 1.5px;
  font-weight: 400;
  font-size: 1.25rem;
  justify-self: stretch;
  justify-content: center;
  align-items: center;
  & > a {
    color: white;
    text-decoration: none;
    cursor: default;
    :hover {
      color: #721f1f;
    }
  }
`;

const TOTAL_POKEMONS = 1126;
const INITIAL_PAGE = 1;
const LIMIT = 20;

const generateEndPoint = (page) => {
  const offset = (page - 1) * LIMIT;
  return `?offset=${offset}&LIMIT=${LIMIT}`;
}

const PokemonList = () => {
  const [page, setPage] = useState(INITIAL_PAGE);
  const { data, error, loading } = useFetch(pokeapi.getPokemons, generateEndPoint(page));

  if (error) return 'Something went wrong';

  return (
    <>
      <Pagination totalItems={TOTAL_POKEMONS} currentPage={page} setPage={setPage} />
      <ListWrapper>
        {loading && (<Loading />)}
        {data &&
          data.results.map(pokemon => (
            <ListItem key={pokemon.name}>
              <Link to={`pokemon/${pokemon.name}`}>{pokemon.name}</Link>
              <Outlet />
            </ListItem>
          ))
        }
      </ListWrapper>
    </>
  );
};

export default PokemonList;
