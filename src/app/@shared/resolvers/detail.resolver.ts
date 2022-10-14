import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import { DetailStoreService } from '../stores/detail-store.service';

@Injectable({
  providedIn: 'root',
})
export class DetailResolver implements Resolve<boolean> {
  constructor(private detailStoreService: DetailStoreService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const pokemonId = route.paramMap.get('id');
    this.detailStoreService.getOnePokemon(pokemonId);
    return of(true);
  }
}
