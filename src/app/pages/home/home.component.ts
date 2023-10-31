import { Component } from '@angular/core';
import { Pokemons } from 'src/app/interface/pokemons';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute } from '@angular/router'
import { Pagination } from 'src/app/interface/pagination';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isLoading: boolean = false;
  pokemons: Pokemons[] = [];
  listPokemons: Pokemons[] = [];
  page!: number;
  pagination!: Pagination;

  constructor(private pokemonService: PokemonService, private router: ActivatedRoute, public search: SearchService) {
    this.page = Number(this.router.snapshot.paramMap.get("page")) ? Number(this.router.snapshot.paramMap.get("page")) : 1;
    this.getPagination();
  }

  ngOnInit() {
    this.listPokemon(this.page ? this.page : 1);
    console.log(this.search.term);
  }

  setPage(newPage: number) {
    this.page = newPage;
    this.listPokemon(this.page);
    this.getPagination();
  }

  listPokemon(page: number = 1) {
    const count = page * 30;
    if (this.pokemons.length > 0) {
      if (count - 30 <= 1000) {
        this.listPokemons = this.pokemons.slice(count - 30, count >= 1000 ? 1000 : count);
      }

    } else {
      this.isLoading = true;
      this.pokemonService.getAll(1000).subscribe((response) => {
        this.pokemons = response.results.map((pokemon) => {
          let id = Number(pokemon.url.split("/")[6]);

          return {
            ...pokemon, id: id, img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          };

        });
        if (count - 30 <= 1000) {
          this.listPokemons = this.pokemons.slice(count - 30, count >= 1000 ? 1000 : count);
        }
        this.isLoading = false;
      });
    }
  }

  getPagination() {
    const lastPage = Math.ceil(1000 / 30);
    const pages = [];

    let count = -1
    while (3 > pages.length) {

      if (this.page + count >= 1 && this.page + count <= lastPage) {
        pages.push(this.page + count);
      } else if (this.page + count > lastPage) {
        pages.push(this.page + count - 1)
      }
      count += 1;
    }

    this.pagination = {
      hasPrevious: this.page > 1,
      hasNext: this.page < lastPage,
      last: lastPage,
      actual: this.page,
      first: 1,
      pages: pages
    }

    console.log(this.pagination);
  }

  makeSearch() {
    if (this.search.term != '') {
      this.listPokemons = [];

      this.pokemons.forEach((pokemon) => {
        if (pokemon.name.toLowerCase().search(this.search.term.toLowerCase())==0) {
          let id = Number(pokemon.url.split("/")[6]);

          this.listPokemons.push({
            ...pokemon, id: id, img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          });
        }
      });
    }else{
      this.setPage(this.page);
    }
    return "test";
  }
}
