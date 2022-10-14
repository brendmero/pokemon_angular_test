import { Injectable } from '@angular/core';
import { IDetailedPokemon } from '../interfaces/pokemon.interface';
import { Store } from './store';
import { FetchService } from '../services/fetch.service';

@Injectable({
  providedIn: 'root'
})
export class DetailStoreService extends Store<IDetailedPokemon> {

  constructor(
    private readonly fetchService: FetchService
  ) {
    super();
  }

  getOnePokemon(id: string | null) {
    this.setState(null);

    if (!id) return;

    if (
      (this.state && this.state.id === Number(id)) ||
      (this.lastId !== null && this.lastId === id)
    ) {
      return;
    }

    if (this.storeArray[id]) {
      this.setState(this.storeArray[id]);
    } else {
      this.fetchService.fetchDetailedPokemon(id)
        .subscribe(
          (response) => {
            this.setState(response, id);
          },
          (error) => {
            this.throwError(error);
          }
        );
    }
  }
}
