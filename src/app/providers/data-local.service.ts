import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Detalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: Detalle[] = [];

  constructor(
    private storage        : Storage,
    private toastController: ToastController
  ) {
    this.getPeliculas();
  }

  guardarPelicula(pelicula: Detalle): boolean {
    let existe : boolean = false;
    let mensaje: string = '';

    for (const p of this.peliculas) {
      if (p.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    if (existe) {
      this.peliculas = this.peliculas.filter(p => p.id !== pelicula.id);
      mensaje = 'Removido de favoritos';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Agregado a favoritos';
    }

    this.presentToast(mensaje);

    this.storage.set('peliculas', this.peliculas);

    return !existe;
  }

  private async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message : mensaje,
      duration: 2000,
      color   : "primary"
    });

    toast.present();
  }

  async getPeliculas(): Promise<any> {
    const favoritos = await this.storage.get('peliculas');
    this.peliculas = favoritos || [];
    return this.peliculas;
  }

  async existePelicula(id: any): Promise<boolean> { 
    await this.getPeliculas();
    const existe = this.peliculas.find(p => p.id === id);

    return (existe) ? true : false;
  }

}
