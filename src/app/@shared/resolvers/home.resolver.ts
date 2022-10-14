import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { HomeStoreService } from '../stores/home-store.service';

@Injectable({
  providedIn: 'root',
})
export class HomeResolver implements Resolve<boolean> {
  constructor(private homeSoreService: HomeStoreService) {}

  resolve(): Observable<boolean> {
    this.homeSoreService.getListPokemon();
    return of(true);
  }
}
