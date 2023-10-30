import { Component } from '@angular/core';
import { Pokemons } from 'src/app/interface/pokemons';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isLoading: boolean = false;
  pokemons: Pokemons[] = [];
  listPokemons: Pokemons[] = [];
  page!:number;
  constructor(private pokemonService: PokemonService, private router: ActivatedRoute) {
    this.page = Number(this.router.snapshot.paramMap.get("page")) ? Number(this.router.snapshot.paramMap.get("page")) : 1;
  }

  ngOnInit() {
    this.listPokemon(this.page?this.page:1);
  }

  setPage(newPage:number){
    this.page = newPage;
    this.listPokemon(this.page);
  }

  listPokemon(page: number=1) {
    const count = page * 30;
    if (this.pokemons.length > 0) {
      this.listPokemons = this.pokemons.slice(count - 31, count - 1);

    } else {
      this.isLoading = true;
      this.pokemonService.getAll(1000).subscribe((response) => {
        this.pokemons = response.results.map((pokemon) => {
          let id = Number(pokemon.url.split("/")[6]);

          return {
            ...pokemon, id: id, img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          };

        });
        if(count - 30 <= 1000){
          this.listPokemons = this.pokemons.slice(count - 30, count>=1000 ? 1000: count);
        }
        console.log(this.listPokemons);
        this.isLoading = false;
      });
    }
  }
}
