import React from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import pokeapi from '../api/pokemon.js';
import useFetch from '../hooks/useFetch';
import Loading from "./Loading.js";

const PokemonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 10rem;
  justify-content: center;
  color: #808080;
  font-weight: 500;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: 400;
`;

const Picture = styled.img`
  max-width: 10rem;
  align-self: center;
  margin: 2rem;
`;

const Types = styled.div`
  display: flex;
  justify-content: center;
`;

const Type = styled.span`
  color: white;
  border-radius: 5px;
  padding: 4px;
  margin-right: 0.5rem;
  justify-self: center;
  &.normal {
    background: #aca981;
  }
  &.fighting {
    background: #bf3228;
  }
  &.flying {
    background: #a792ee;
  }
  &.poison {
    background: #a042a3;
  }
  &.ground {
    background: #e2c06b;
  }
  &.rock {
    background: #b6a038;
  }
  &.bug {
    background: #aab922;
  }
  &.ghost {
    background: #705a98;
  }
  &.steel {
    background: #b7b8ce;
  }
  &.fire {
    background: #e28145;
  }
  &.water {
    background: #718bf1;
  }
  &.grass {
    background: #79cb4f;
  }
  &.electric {
    background: #f8d02e;
  }
  &.psychic {
    background: #f55a86;
  }
  &.ice {
    background: #9bd8d8;
  }
  &.dragon {
    background: #6b3af8;
  }
  &.dark {
    background: #705847;
  }
  &.fairy {
    background: #ee9bae;
  }
  &.unknown {
    background: #68a192;
  }
  &.shadow {
    background: #747474;
  }
`;

const Abilities = styled.div`
  margin: 1rem auto;
`;

const Ability = styled.span`
  margin: auto 0.5rem;
`;

const Moves = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem auto;
  align-items: center;
  justify-content: space-between;
`;

const Move = styled.span`
  margin: auto 0.5rem;
  padding: 2px;
`;

const Pokemon = () => {
  const { name } = useParams();
  const { data, error, loading } = useFetch(pokeapi.getPokemonByName, name);

  if (error) return 'Something went wrong';

  return (
    <PokemonWrapper>
      {loading && (<Loading />)}
      {data && (
        <>
          <Title>{data.name} - N° {data.id}</Title>
          <Picture src={data.sprites.other.dream_world.front_default} alt={data.name} />
          <Types>
            {data.types.map(({ type, _ }) => (<Type className={type.name}>{type.name}</Type>))}
          </Types>
          <Abilities>
            <strong>Abilities: </strong>
            {data.abilities.map(({ ability, _ }) => (<Ability>{ability.name}</Ability>))}
          </Abilities>
          <Moves>
            <strong>Moves: </strong>
            {data.moves.map(({ move, _ }) => (<Move>{move.name}</Move>))}
          </Moves>
        </>
      )}
    </PokemonWrapper>
  );
};

export default Pokemon;
