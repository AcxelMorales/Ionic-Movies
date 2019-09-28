import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { RespuestaMDB, Detalle, Credits, Genre } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage: number = 0;
  private generos      : any[] = [];

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(path: string): Observable<T> {
    path = URL + path;
    path += `&api_key=${API_KEY}&language=es&include_image_language=es`;
    
    return this.http.get<T>(path);
  }

  getFeature(): Observable<RespuestaMDB> {
    const hoy       = new Date();
    const mes       = hoy.getMonth();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();

    let mesString;

    if (mes < 10) {
      mesString = '0' + mes;
    } else {
      mesString = mes;
    }

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const final  = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.lte=${final}`);
  }

  getPopular(): Observable<RespuestaMDB> {
    this.popularesPage++;
    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<RespuestaMDB>(query); 
  }

  getPeliculaDetalle(id: string): Observable<Detalle> {
    return this.ejecutarQuery<Detalle>(`/movie/${id}?a=6`);
  }

  getCredits(id: string): Observable<Credits> {
    return this.ejecutarQuery<Credits>(`/movie/${id}/credits?a=6`);
  }

  buscarPelicula(pelicula: string): Observable<any> {
    return this.ejecutarQuery<any>(`/search/movie?query=${pelicula}`);
  }

  cargarGeneros(): Promise<Genre[]> {
    return new Promise((resolve) => {
      this.ejecutarQuery('/genre/movie/list?a=1').subscribe(resp => {
        this.generos = resp['genres'];
        resolve(this.generos);
      });
    });
  }

}
