import { Pipe, PipeTransform } from '@angular/core';
import { SharedGame } from '../model/shared-game';
import { CivGame } from './_gen/swagger/api';

const getGameDef = (game: SharedGame, games: CivGame[]) => games.find(g => g.id === game.gameType);

@Pipe({name: 'gamespeed'})
export class GameSpeedPipe implements PipeTransform {
  transform(game: SharedGame, games: CivGame[]): string {
    if (!games) {
      return '';
    }

    const speed = getGameDef(game, games).gameSpeeds.find(s => s.key === game.gameSpeed);
    return speed ? speed.displayName : 'Other / Custom Speed';
  }
}

@Pipe({name: 'map'})
export class MapPipe implements PipeTransform {
  transform(game: SharedGame, games: CivGame[]): string {
    if (!games) {
      return '';
    }

    const map = getGameDef(game, games).maps.find(m => m.file === game.mapFile);
    return map ? map.displayName : 'Other / Custom Map';
  }
}

@Pipe({name: 'mapsize'})
export class MapSizePipe implements PipeTransform {
  transform(game: SharedGame, games: CivGame[]): string {
    if (!games) {
      return '';
    }

    const size = getGameDef(game, games).mapSizes.find(s => s.key === game.mapSize);
    return size ? size.displayName : 'Other / Custom Size';
  }
}
