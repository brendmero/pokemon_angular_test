import { Injectable } from '@angular/core';
import { FetchService } from '../services/fetch.service';
import { Store } from './store';
import { IPokemon } from '../interfaces/pokemon.interface';
import {ApiPokemonParams} from "../interfaces/api.interface";

@Injectable({
  providedIn: 'root'
})
export class HomeStoreService extends Store<IPokemon> {

  constructor(
    private readonly fetchService: FetchService,
  ) {
    super();
  }

  public getListPokemon(params?: ApiPokemonParams) {
    this.fetchService.fetchPokemonList(params).subscribe(
      (response) => {
        this.setState(response);
      },
      (error) => {
        this.throwError(error);
      },
    )
  }
}
