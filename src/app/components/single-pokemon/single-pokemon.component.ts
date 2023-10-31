import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SinglePokemon } from 'src/app/interface/single-pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-single-pokemon',
  templateUrl: './single-pokemon.component.html',
  styleUrls: ['./single-pokemon.component.scss']
})
export class SinglePokemonComponent {

  id!: number;
  pokemon!: SinglePokemon;
  isLoading: boolean = false;

  constructor (private router: ActivatedRoute, private pokemonService: PokemonService) {
    this.id = Number(this.router.snapshot.paramMap.get('id'));
  }

  ngOnInit(){
    this.isLoading=true;
    this.pokemonService.getPokemon(this.id).subscribe((response)=>{
      this.pokemon=response;
      this.isLoading=false;
    })
  }
}
