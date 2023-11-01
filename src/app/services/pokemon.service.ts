import { Injectable } from '@angular/core';
import { ResponseAll } from '../interface/response-all';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { PokemonResponse } from '../interface/pokemon-response';
import { SinglePokemon } from '../interface/single-pokemon';
import { PokemonSpcecies } from '../interface/pokemon-spcecies';
import { PokemonEvolution } from '../interface/pokemon-evolution';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = "https://pokeapi.co/api/v2";
  data!: ResponseAll<PokemonResponse>;
  total!: number;

  constructor(private http: HttpClient) { }

  getTotal(): Observable<ResponseAll<PokemonResponse>> {
    return this.http.get<ResponseAll<PokemonResponse>>(`${this.baseUrl}/pokemon/?limit=1`);
  }

  getAll(limit: number = this.total): Observable<ResponseAll<PokemonResponse>> {
    return this.http.get<ResponseAll<PokemonResponse>>(`${this.baseUrl}/pokemon/?limit=${limit}`);
  }

  getPokemon(id: number): Observable<SinglePokemon> {
    return this.http.get<SinglePokemon>(`${this.baseUrl}/pokemon/${id}`);
  }

  getEvolution(id:number){
    var subject = new Subject<PokemonEvolution>();
    this.http.get<PokemonSpcecies>(`${this.baseUrl}/pokemon-species/${id}`).subscribe((response)=>{
      this.http.get<PokemonEvolution>(response.evolution_chain.url).subscribe((data)=>{
        subject.next(data);
      });
    });

    return subject.asObservable();
  }
}
