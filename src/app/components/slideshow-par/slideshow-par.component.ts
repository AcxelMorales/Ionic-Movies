import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-par',
  templateUrl: './slideshow-par.component.html',
})
export class SlideshowParComponent {

  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter<any>();

  slideOpts: any = {
    slidesPerView: 3.3,
    freeMode     : true,
    spaceBetween : -20
  };

  constructor(private modalController: ModalController) { }

  onClick(): void {
    this.cargarMas.emit();
  }

  public async detalle(id: string): Promise<void> {
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {id}
    });

    modal.present();
  }

}
