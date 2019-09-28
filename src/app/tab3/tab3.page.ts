import { Component } from '@angular/core';

import { Detalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../providers/data-local.service';
import { MoviesService } from '../providers/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
})
export class Tab3Page {

  peliculas     : Detalle[] = [];
  generos       : Genre[] = [];
  favoritoGenero: any[] = [];

  constructor(
    public _dataLocalService: DataLocalService,
    public _moviesService   : MoviesService
  ) {}

  async ionViewWillEnter(): Promise<void> {
    this.peliculas = await this._dataLocalService.getPeliculas();
    this.generos   = await this._moviesService.cargarGeneros();

    this.pelisPorGenero(this.generos, this.peliculas);
  }

  private pelisPorGenero(generos: Genre[], peliculas: Detalle[]): void {
    this.favoritoGenero = [];

    generos.forEach(g => {
      this.favoritoGenero.push({
        genero: g.name,
        pelis : peliculas.filter(p => {
          return p.genres.find(genre => genre.id === g.id);
        })
      });
    });
  }

}
