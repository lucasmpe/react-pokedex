import React from 'react';
import styled from '@emotion/styled';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import PokemonList from './PokemonList';
import Pokemon from './Pokemon';
import NoMatch from './NoMatch';
import { CacheProvider } from '../context/CacheContext';

const Wrapper = styled.div`
 min-height: 100vh;
 background: #ffffff;
 color: black;
 display: flex;
 flex-direction: column;
`;

function App() {
  return (
    <Wrapper>
      <CacheProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<PokemonList />} />
              <Route path="pokemon/:name" element={<Pokemon />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CacheProvider>
    </Wrapper>
  );
}

export default App;
