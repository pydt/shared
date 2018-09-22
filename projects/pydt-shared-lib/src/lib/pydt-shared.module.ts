import { NgModule } from '@angular/core';
import { BusyComponent } from './busy/busy.component';
import { BusyService } from './busy/busy.service';
import { Civ6GameSpeedPipe, Civ6MapPipe, Civ6MapSizePipe } from './pipes';

@NgModule({
  imports: [
  ],
  declarations: [
    BusyComponent,
    Civ6GameSpeedPipe,
    Civ6MapPipe,
    Civ6MapSizePipe
  ],
  providers: [
    BusyService
  ],
  exports: [
    BusyComponent,
    Civ6GameSpeedPipe,
    Civ6MapPipe,
    Civ6MapSizePipe
  ]
})
export class PydtSharedModule { }
