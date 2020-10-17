import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { SteamProfileMap } from '../profile-cache.service';
import { CivDef, Game, GamePlayer, SteamProfile } from '../_gen/swagger/api';

@Component({
  selector: 'pydt-player-avatar',
  templateUrl: './player-avatar.component.html',
  styleUrls: ['./player-avatar.component.css']
})
export class PlayerAvatarComponent implements OnDestroy {
  @Input() game: Game;
  @Input() index: number;
  @Input() players: GamePlayer[] = [];
  @Input() gamePlayerProfiles: SteamProfileMap;
  @Input() civDefs: CivDef[] = [];
  @Input() size: 'BIG' | 'SMALL' = 'SMALL';
  @Input() thumbnailOnly = false;
  @Input() thumbnailOnlyDragMode = false;
  @Output() click = new EventEmitter<GamePlayer>();
  @ViewChild('tooltip') tooltip: any;
  isMouseOver = false;

  get hasClickListener() {
    return !!this.click.observers.length;
  }

  get player() {
    return this.players[this.index];
  }

  get civDef() {
    return this.civDefs[this.index];
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
        civDesc = this.civDef.fullDisplayName;
      }

      let result = `${playerName} /<br />${civDesc}`;

      if (!this.player.hasSurrendered) {
        if (profile) {
          if (profile.timezone) {
            result += `<br />${profile.timezone}`;
          }

          if (profile.comments) {
            result += `<br />${profile.comments}`;
          }
        }
      }

      return result;
    } else {
      if (this.isEmptyHumanSlot) {
        return 'Empty Human Slot';
      }

      return 'AI';
    }
  }

  get avatarSize() {
    return this.size === 'BIG' ? '64px' : '32px';
  }

  get vacationTop() {
    return this.size === 'BIG' ? '22px' : '5px';
  }

  get thumbnailMarginBottom() {
    return this.size === 'BIG' ? null : '0px';
  }

  get isHuman() {
    return this.player && this.player.steamId && !this.player.hasSurrendered;
  }

  get isEmptyHumanSlot() {
    return !this.player && this.game && !this.game.inProgress && this.index < this.game.humans;
  }

  playerIsOnVacation(player: GamePlayer) {
    const profile = this.gamePlayerProfiles[player.steamId];
    return (this.isHuman && profile) ? !!profile.vacationMode : false;
  }

  get imgSrc() {
    if (this.isMouseOver) {
      const image = this.civDef ? this.civDef.imageFileName : 'RANDOM_RANDOM.png';
      return `https://playyourdamnturn.com/img/civs/${image}`;
    }

    if (this.isHuman) {
      return (this.gamePlayerProfiles[this.player.steamId] || {} as SteamProfile).avatarmedium;
    }

    if (this.isEmptyHumanSlot) {
      return 'https://playyourdamnturn.com/img/emptyslot.svg';
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
