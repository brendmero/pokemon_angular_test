import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalPage!: number;
  @Input() currentPage!: number;
  @Output() changePage: EventEmitter<any> = new EventEmitter<any>();

  middleItems: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.controlMiddleItems(this.currentPage);
  }

  ngOnChanges() {
    this.controlMiddleItems(this.currentPage);
  }

  controlMiddleItems(page: number) {
    const pages = new Array(this.totalPage).fill(null).map((item, index) => index + 1);

    if (page < 4) {
      this.middleItems = pages.slice(1, 5);
    } else if (page > this.totalPage - 4) {
      this.middleItems = pages.slice(this.totalPage - 5, this.totalPage - 1);
    } else {
      this.middleItems = pages.slice(page - 2, page + 1);
    }
  };

  goToPrev() {
    this.selectPage(Math.max(1, this.currentPage - 1));
  }

  goToNext() {
    this.selectPage(Math.min(this.totalPage, this.currentPage + 1));
  }

  selectPage(page: number) {
    this.controlMiddleItems(page);
    this.changePage.emit(page);
  }
}
