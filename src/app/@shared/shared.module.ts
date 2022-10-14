import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './snippets/header/header.component';
import { PaginationComponent } from './snippets/pagination/pagination.component';
import { TableComponent } from './snippets/table/table.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PaginationComponent,
    TableComponent,
  ],
  exports: [
    HeaderComponent,
    TableComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
