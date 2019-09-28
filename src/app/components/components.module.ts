import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { SlideshowParComponent } from './slideshow-par/slideshow-par.component';
import { DetalleComponent } from './detalle/detalle.component';

import { PipeModule } from '../pipe/pipe.module';

@NgModule({
  entryComponents: [DetalleComponent],
  declarations: [
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshowParComponent,
    DetalleComponent
  ],
  exports: [
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshowParComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipeModule
  ]
})
export class ComponentsModule { }
