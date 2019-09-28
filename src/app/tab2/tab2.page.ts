import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { MoviesService } from '../providers/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
})
export class Tab2Page {

  public txtBuscar: string = '';
  public ideas    : string[] = ['Proyecto X', 'El señor de los anillos', 'Interestelar', 'Party Monster', 'Pulp Fiction'];
  public peliculas: Pelicula[] = [];
  public cargando : boolean = false;
  public ocultar  : boolean = false;

  constructor(
    public _moviesService: MoviesService,
    private modalController: ModalController
  ) {}

  public buscar(evt: any): void {
    this.cargando = true;

    const value: string = evt.detail.value;

    if (value.length === 0) {
      this.cargando  = false;
      this.ocultar   = false;
      this.peliculas = [];
      return;
    }

    this._moviesService.buscarPelicula(value).subscribe(peliculas => {
      this.cargando  = false;
      this.ocultar   = true;
      this.peliculas = peliculas.results;
    });
  }

  public async detalle(id: string): Promise<void> {
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {id}
    });

    modal.present();
  }

}
