import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { NotFoundComponent } from './layouts/error/404/not-found.component';

const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', loadChildren: './home/home/home.module#HomeModule'},
    ],
  },
  {
    path: 'error',
    component: BlankComponent,
    children: [
      {
        path: '404',
        component: NotFoundComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/error/404',
  }];

@NgModule({
  imports: [RouterModule.forRoot(Approutes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
