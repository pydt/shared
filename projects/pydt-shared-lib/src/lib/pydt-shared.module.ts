import { NgModule } from "@angular/core";
import { BusyComponent } from "./busy/busy.component";
import { GameSpeedPipe, MapPipe, MapSizePipe, RandomOnlyPipe, TurnTimerVacationPipe } from "./pipes";
import { PlayerAvatarComponent } from "./player-avatar/player-avatar.component";

const SHARED = [
  BusyComponent,
  PlayerAvatarComponent,
  GameSpeedPipe,
  MapPipe,
  MapSizePipe,
  RandomOnlyPipe,
  TurnTimerVacationPipe,
];

/**
 * Everything is standalone now, so standalone components should import just the pieces they use. This
 * module only re-exports them for NgModule-based apps. It has no providers on purpose: the services are
 * providedIn root, and a module with providers imported into a routed or bootstrapped standalone
 * component gets its own copy of each service (which broke the busy spinner and the metadata cache).
 */
@NgModule({
  imports: SHARED,
  exports: SHARED,
})
export class PydtSharedModule {}
