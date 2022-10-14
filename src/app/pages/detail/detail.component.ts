import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IDetailedPokemon } from '../../@shared/interfaces/pokemon.interface';
import { DetailStoreService } from '../../@shared/stores/detail-store.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  data: IDetailedPokemon = {} as IDetailedPokemon;

  constructor(
    private readonly detailStoreService: DetailStoreService,
    private readonly location: Location,
  ) { }

  ngOnInit(): void {
    this.detailStoreService.state$.subscribe((state) => {
      this.data = state;
    });
  }

  goToHome() {
    this.location.back();
  }

  getImageUrl(id: number) {
    return `${environment.imageUrl}/${id}.png`;
  }
}
