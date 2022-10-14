import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import {ApiPokemonParams} from '../interfaces/api.interface';

@Injectable({
  providedIn: 'root'
})
export class FetchService extends ApiService {

  constructor(
    protected override http: HttpClient,
  ) {
    super(http);
  }

  public fetchPokemonList(params?: ApiPokemonParams): Observable<any> {
    return this.get<any>('pokemon', params);
  }

  public fetchDetailedPokemon(id: string): Observable<any> {
    return this.get<any>(`pokemon/${id}`);
  }
}
