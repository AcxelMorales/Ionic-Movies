import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { MoviesService } from '../providers/movies.service';
import { RespuestaMDB, Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
})
export class Tab1Page implements OnInit, OnDestroy {

  peliculasRecientes: Pelicula[] = [];
  populares         : Pelicula[] = [];

  recientesSubscription: Subscription = new Subscription();
  popularesSubscription: Subscription = new Subscription();
  
  constructor(public _moviesService: MoviesService) {}

  ngOnInit(): void {
    this.recientesSubscription = this._moviesService.getFeature().subscribe((resp: RespuestaMDB) => this.peliculasRecientes = resp.results);
    this.getPopulares();
  }
  
  public cargarMas(): void {
    this.getPopulares();  
  }
  
  private getPopulares(): void {
    this.popularesSubscription = this._moviesService.getPopular().subscribe((resp: RespuestaMDB) => {
      const arrTemp = [...this.populares, ...resp.results];
      this.populares = arrTemp;
    });
  }

  ngOnDestroy(): void {
    this.recientesSubscription.unsubscribe();
    this.popularesSubscription.unsubscribe();
  }

}