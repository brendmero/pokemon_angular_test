export interface IPokemon {
  count: number;
  next?: string;
  previous?: string;
  results: IPokemonItem[];
}

export interface IPokemonItem {
  name: string;
  url: string;
}

export interface IDetailedPokemon {
  id: number;
  weight: number;
  height: number;
  base_experience: number;
  is_default: boolean;
  location_area_encounters: string;
  abilities: any[];
  forms: any[];
  game_indices: any[];
  held_items: any[];
  moves: any[];
}
