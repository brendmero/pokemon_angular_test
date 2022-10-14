import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailComponent } from './pages/detail/detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeResolver } from './@shared/resolvers/home.resolver';
import { DetailResolver } from './@shared/resolvers/detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      home: HomeResolver,
    }
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
    resolve: {
      detail: DetailResolver,
    },
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
