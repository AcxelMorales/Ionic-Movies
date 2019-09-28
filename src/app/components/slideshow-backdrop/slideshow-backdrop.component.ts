import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];

  slideOpts: any = {
    slidesPerView: 1.2,
    freeMode     : true
  };

  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  public async detalle(id: string): Promise<void> {
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {id}
    });

    modal.present();
  }

}
