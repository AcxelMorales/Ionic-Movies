import { NgModule } from '@angular/core';

import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';

@NgModule({
  declarations: [
    ImagenPipe, 
    ParesPipe
  ],
  exports: [
    ImagenPipe, 
    ParesPipe
  ],
  imports: []
})
export class PipeModule { }
