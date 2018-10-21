import { NgModule } from '@angular/core';
import { BusyComponent } from './busy/busy.component';
import { BusyService } from './busy/busy.service';
import { GameSpeedPipe, MapPipe, MapSizePipe } from './pipes';

@NgModule({
  imports: [
  ],
  declarations: [
    BusyComponent,
    GameSpeedPipe,
    MapPipe,
    MapSizePipe
  ],
  providers: [
    BusyService
  ],
  exports: [
    BusyComponent,
    GameSpeedPipe,
    MapPipe,
    MapSizePipe
  ]
})
export class PydtSharedModule { }
