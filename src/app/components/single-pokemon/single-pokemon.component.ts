import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SinglePokemon } from 'src/app/interface/single-pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { faArrowRight, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { PokemonEvolution } from 'src/app/interface/pokemon-evolution';

@Component({
  selector: 'app-single-pokemon',
  templateUrl: './single-pokemon.component.html',
  styleUrls: ['./single-pokemon.component.scss']
})
export class SinglePokemonComponent {

  id!: number;
  pokemon!: SinglePokemon;
  isLoading: boolean = false;
  evolutionList: {
    list: { name: string, id: number, url: string, stage: number }[],
    totalStage: number[]
  } = { list: [], totalStage: [1] };

  faChartLine = faChartLine;
  faArrowRight = faArrowRight

  constructor(private router: ActivatedRoute, private pokemonService: PokemonService) {
    this.id = Number(this.router.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.isLoading = true;
    this.pokemonService.getPokemon(this.id).subscribe({next:async (response) => {

        this.pokemon = response;

      this.pokemonService.getEvolution(this.id).subscribe((response) => {
          this.listEnvolves(response);
          this.isLoading = false;
      });
    }, error:()=>{
      this.isLoading=false;
    }} )

  }

  listEnvolves(evolution: PokemonEvolution, stage = 1) {

    let initialId = Number(evolution.chain.species.url.split("/")[6]);

    this.evolutionList.list.push({ name: evolution.chain.species.name, url: evolution.chain.species.url, id: initialId, stage: stage });

    if (evolution.chain.evolves_to.length > 0) {
      evolution.chain.evolves_to.forEach((element) => {
        let nextStage = stage + 1;
        if (!this.evolutionList.totalStage.includes(nextStage)) {
          this.evolutionList.totalStage.push(nextStage);
        }
        this.listEnvolves({ chain: element }, nextStage);
      })
    }
  }

  getWidhtStage() {
    return 100 / this.evolutionList.totalStage.length + "%";
  }
}
