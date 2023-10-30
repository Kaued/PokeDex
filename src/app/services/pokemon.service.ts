import { Injectable } from '@angular/core';
import { ResponseAll } from '../interface/response-all';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonResponse } from '../interface/pokemon-response';

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
}
