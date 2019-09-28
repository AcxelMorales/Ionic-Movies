import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Pelicula } from '../../interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];

  slideOpts: any = {
    slidesPerView: 3.3,
    freeMode     : true
  };

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  public async detalle(id: string): Promise<void> {
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {id}
    });

    modal.present();
  }

}
