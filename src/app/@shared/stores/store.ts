import { Observable, BehaviorSubject, filter, map } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class Store<T> {
  private _state$: BehaviorSubject<T | null> = new BehaviorSubject<T | null>(
    null
  );
  state$!: Observable<T>;
  storeArray: { [key: string]: T } = {};
  lastId: any = null; // save last id while we are waiting for the API response to avoid repetition calls

  protected constructor(private dispatchNullValues: boolean = false) {
    this.state$ = this._state$.pipe(
      filter((x) => dispatchNullValues || !!x), // avoid getting null values
      map((data) => data as T)
    );
  }

  get state(): T | null {
    return this._state$.getValue();
  }

  setState(nextState: T | null, id: string = ''): void {
    if (
      !environment.production &&
      ((!this.dispatchNullValues && nextState !== null) ||
        this.dispatchNullValues)
    ) {
      console.groupCollapsed(`[Store state updated]`);
      console.info(nextState);
      console.groupEnd();
    }
    // save the object to the store array
    if (nextState && id !== '') {
      this.storeArray[id] = nextState;
    }
    this._state$.next(nextState);
    this.lastId = null;
  }

  throwError(error: string) {
    if (!environment.production) {
      console.groupCollapsed(`[Store error]`);
      console.error(error);
      console.groupEnd();
    }
    this.setState(null);
  }
}
