import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HomeStoreService } from '../../@shared/stores/home-store.service';
import { IPokemon } from '../../@shared/interfaces/pokemon.interface';
import { ApiPokemonParams } from '../../@shared/interfaces/api.interface';

const limit = 20;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();

  data: IPokemon = {} as IPokemon;

  totalPage: number = 0;
  currentPage: number = 0;

  constructor(
    private readonly homeStoreService: HomeStoreService,
  ) { }

  ngOnInit(): void {
    this.homeStoreService.state$.pipe(takeUntil(this.destroy$)).subscribe((state) => {
      this.data = state;
      this.handleParams(state);
    })
  }

  handleParams(data: IPokemon) {
    const url = data.next || data.previous;
    const total = data.count;
    this.totalPage = Math.ceil(total / limit);

    if (url) {
      const offset = url.replace(/[\w\W]*offset=(\d+)[\w\W]*$/, '$1');
      if (!Number.isNaN(offset)) {
        this.currentPage = Number(offset) / limit;
      }
    }
  }

  changePage(page: number) {
    this.currentPage = page;
    const params: ApiPokemonParams = {
      offset: (page - 1) * limit,
      limit,
    };
    this.homeStoreService.getListPokemon(params);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
