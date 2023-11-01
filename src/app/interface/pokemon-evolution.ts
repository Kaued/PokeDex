export interface PokemonEvolution {
  chain: EvolutionTo,
}

interface EvolutionTo {
  evolves_to: EvolutionTo[],
  species: {
    name: string,
    url: string,
    id?: number
  }
}
