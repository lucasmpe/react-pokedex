const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

const getResource = async (resourceUrl) => {
  const response = await fetch(resourceUrl);
  if (!response.ok) {
    throw new Error('API Error');
  }

  return response.json();
};

const pokeapi = {
  getPokemons: (endPoint) => getResource(`${BASE_URL}/${endPoint}`),
  getPokemonByName: (name) => getResource(`${BASE_URL}/${name}`),
};

export default pokeapi;
