import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ApiStatus } from '../interfaces/api.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public headers: HttpHeaders;
  public apiResultBehavior: BehaviorSubject<ApiStatus | undefined> = new BehaviorSubject<ApiStatus | undefined>(undefined);
  public apiResult: Observable<ApiStatus | undefined>;

  constructor(
    protected http: HttpClient,
  ) {
    this.headers = new HttpHeaders();
    this.headers.set('Content-Type', 'application/json');

    this.apiResult = this.apiResultBehavior.asObservable();
  }

  protected get<T = any>(
    url: string,
    params: any = {},
    options: any = {}
  ): Observable<T> {
    return this.request<T>(
      'get', url,
      {
        headers: this.headers,
        ...options,
        params
      },
    );
  }

  protected request<T = any>(
    method: string,
    url: string,
    options: any = {}
  ): Observable<any> {
    return new Observable((observer: Subscriber<any>): void => {
      this.http.request<T>(method, `${environment.pokemonApi}${url}`, options)
        .subscribe(
          (response: HttpEvent<T>) => {

            observer.next(response);
            observer.complete();
          },
          (error: any) => {
            observer.error(error);
            observer.complete();
          });
    });
  }
}
