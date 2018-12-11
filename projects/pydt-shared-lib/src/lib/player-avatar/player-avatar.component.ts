import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { CivDef } from '../civdefs';
import { SteamProfileMap } from '../profile-cache.service';
import { Game, GamePlayer, SteamProfile } from '../_gen/swagger/api';

@Component({
  selector: 'pydt-player-avatar',
  templateUrl: './player-avatar.component.html',
  styleUrls: ['./player-avatar.component.css']
})
export class PlayerAvatarComponent implements OnDestroy {
  @Input() game: Game;
  @Input() player: GamePlayer;
  @Input() gamePlayerProfiles: SteamProfileMap;
  @Input() civDef: CivDef;
  @Input() avatarSize = '32px';
  @Input() thumbnailMarginBottom: string = null;
  @Output() click = new EventEmitter<GamePlayer>();
  @ViewChild('tooltip') tooltip: any;
  isMouseOver = false;

  get hasClickListener() {
    return !!this.click.observers.length;
  }

  get tooltipHtml() {
    if (this.player) {
      const profile = this.gamePlayerProfiles[this.player.steamId];
      let playerName = 'AI';

      if (profile && !this.player.hasSurrendered) {
        playerName = profile.personaname;
      }

      let civDesc = 'Unknown Civ';

      if (this.civDef) {
        civDesc = this.civDef.getFullDisplayName();
      }

      let result = `${playerName} /<br />${civDesc}`;

      if (profile.timezone) {
        result += `<br />${profile.timezone}`;
      }

      if (profile.comments) {
        result += `<br />${profile.comments}`;
      }

      return result;
    } else {
      return 'AI';
    }
  }

  playerIsOnVacation(player: GamePlayer) {
    const profile = this.gamePlayerProfiles[player.steamId];
    return profile ? !!profile.vacationMode : false;
  }

  get imgSrc() {
    if (this.isMouseOver) {
      const image = this.civDef ? this.civDef.getImageFileName() : 'RANDOM_RANDOM.png';
      return `https://playyourdamnturn.com/img/civs/${image}`;
    }

    if (this.player && this.player.steamId && !this.player.hasSurrendered) {
      return (this.gamePlayerProfiles[this.player.steamId] || {} as SteamProfile).avatarmedium;
    }

    return 'https://playyourdamnturn.com/img/android.png';
  }

  iconMouseOver() {
    this.isMouseOver = true;
  }

  iconMouseOut() {
    this.isMouseOver = false;
  }

  ngOnDestroy() {
    this.tooltip.hide();
  }
}
