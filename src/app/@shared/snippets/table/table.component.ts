import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IPokemonItem } from '../../interfaces/pokemon.interface';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() data: IPokemonItem[] = [];

  constructor(
    private readonly router: Router,
  ) { }

  getId(url: string) {
    if (!Number.isNaN(url)) {
      return url.replace(/[\w\W]*\/(\d+)\/$/, '$1');
    }
    return 0;
  }

  getImageUrl(url: string) {
    const id = this.getId(url);
    return `${environment.imageUrl}/${id}.png`;
  }

  goToDetailPage(url: string) {
    const id = this.getId(url);
    this.router.navigate([`/detail/${id}`]);
  }
}
