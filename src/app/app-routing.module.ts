import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SinglePokemonComponent } from './components/single-pokemon/single-pokemon.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:":page", component:HomeComponent},
  {path:"pokemon/:id", component:SinglePokemonComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
