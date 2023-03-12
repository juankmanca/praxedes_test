import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from '../guards/usuario.guard';
import { HomeComponent } from './home/home.component';
import { EpisodeComponent } from './episode/episode.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        canActivate: [UsuarioGuard],
        component: HomeComponent
      },
      {
        path: 'episode/:id',
        canActivate: [UsuarioGuard],
        component: EpisodeComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }
