import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { MoviesService } from '../../providers/movies.service';
import { Detalle, Credits } from '../../interfaces/interfaces';
import { DataLocalService } from '../../providers/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
})
export class DetalleComponent implements OnInit {

  @Input() id: string;

  detalle : Detalle = {};
  credits : Credits;
  oculto  : number = 240;
  estrella: string = 'star-outline';

  optActores: any = {
    slidesPerView: 3.3,
    freeMode     : true,
    spaceBetween : -5
  };

  constructor(
    public _moviesService   : MoviesService,
    public _dataLocalService: DataLocalService,
    private modalController : ModalController,
  ) { }

  ngOnInit(): void {
    this._dataLocalService.existePelicula(this.id).then(e => this.estrella = (e) ? 'star' : 'star-outline');
    
    this._moviesService.getPeliculaDetalle(this.id).subscribe((detalleService: Detalle) => this.detalle = detalleService);
    this._moviesService.getCredits(this.id).subscribe((creditsMDB: Credits) => this.credits = creditsMDB);
  }

  public regresar(): void {
    this.modalController.dismiss();
    this._moviesService.getPeliculaDetalle(this.id).subscribe((detalleService: Detalle) => this.detalle = detalleService);
  }

  public favorito(): void {
    const existe  = this._dataLocalService.guardarPelicula(this.detalle);
    this.estrella = (existe) ? 'star' : 'star-outline';
  }

}
