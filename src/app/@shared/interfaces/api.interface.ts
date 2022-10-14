export interface ApiStatus {
  status: string;
  url?: string;
  errorMessage: string;
}

export interface ApiPokemonParams {
  offset: number;
  limit: number;
}
