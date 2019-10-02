import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { MoviesService } from '../../providers/movies.service';
import { Detalle, Credits, Crew } from '../../interfaces/interfaces';
import { DataLocalService } from '../../providers/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
})
export class DetalleComponent implements OnInit, OnDestroy {

  @Input() id: string;

  detalle : Detalle = {};
  credits : Credits;
  crew    : Crew[];
  oculto  : number = 240;
  estrella: string = 'star-outline';

  detalleSubscription: Subscription = new Subscription();
  creditsSubscription: Subscription = new Subscription();

  optActores: any = {
    slidesPerView: 3.3,
    freeMode     : true,
    spaceBetween : -5
  };

  slideOpts: any = {
    slidesPerView: 3.6,
    freeMode     : true
  };

  constructor(
    public _moviesService   : MoviesService,
    public _dataLocalService: DataLocalService,
    private modalController : ModalController,
  ) { }

  ngOnInit(): void {
    this._dataLocalService.existePelicula(this.id).then(e => this.estrella = (e) ? 'star' : 'star-outline');
    
    this.detalleSubscription = this._moviesService.getPeliculaDetalle(this.id).subscribe((detalleService: Detalle) => this.detalle = detalleService);
    this.creditsSubscription = this._moviesService.getCredits(this.id).subscribe((creditsMDB: Credits) => {
      this.credits = creditsMDB;
      this.crew    = creditsMDB.crew;
    });
  }

  public regresar(): void {
    this.modalController.dismiss();
    this.detalleSubscription = this._moviesService.getPeliculaDetalle(this.id).subscribe((detalleService: Detalle) => this.detalle = detalleService);
  }

  public favorito(): void {
    const existe  = this._dataLocalService.guardarPelicula(this.detalle);
    this.estrella = (existe) ? 'star' : 'star-outline';
  }

  ngOnDestroy(): void {
    this.detalleSubscription.unsubscribe();
    this.creditsSubscription.unsubscribe();
  }

}
