import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { BusyComponent } from "./busy/busy.component";
import { DateInterceptor } from "./date-interceptor.service";
import { BusyService } from "./busy/busy.service";
import { MetadataCacheService } from "./metadata-cache.service";
import { GameSpeedPipe, MapPipe, MapSizePipe, RandomOnlyPipe, TurnTimerVacationPipe } from "./pipes";
import { PlayerAvatarComponent } from "./player-avatar/player-avatar.component";

@NgModule({
  imports: [CommonModule, TooltipModule],
  declarations: [
    BusyComponent,
    PlayerAvatarComponent,
    GameSpeedPipe,
    MapPipe,
    MapSizePipe,
    RandomOnlyPipe,
    TurnTimerVacationPipe,
  ],
  providers: [BusyService, DateInterceptor, MetadataCacheService],
  exports: [
    BusyComponent,
    PlayerAvatarComponent,
    GameSpeedPipe,
    MapPipe,
    MapSizePipe,
    RandomOnlyPipe,
    TurnTimerVacationPipe,
  ],
})
export class PydtSharedModule {}
