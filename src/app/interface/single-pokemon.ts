export interface SinglePokemon {
  id: number,
  height: number,
  weight: number,
  name: string,
  types: {
    slot: number,
    type:{
      name:string
    }
  }[],
  stats: {
    base_stat: number,
    stat:{
      name: string
    }
  }[]
}
