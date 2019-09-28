import { Component, OnInit } from '@angular/core';

import { MoviesService } from '../providers/movies.service';
import { RespuestaMDB, Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  populares         : Pelicula[] = [];
  
  constructor(public _moviesService: MoviesService) {}

  ngOnInit(): void {
    this._moviesService.getFeature().subscribe((resp: RespuestaMDB) => this.peliculasRecientes = resp.results);
    this.getPopulares();
  }
  
  public cargarMas(): void {
    this.getPopulares();  
  }
  
  private getPopulares(): void {
    this._moviesService.getPopular().subscribe((resp: RespuestaMDB) => {
      const arrTemp = [...this.populares, ...resp.results];
      this.populares = arrTemp;
    });
  }

}