import { Pipe, PipeTransform } from '@angular/core';
import { GAMES } from './games';
import { SharedGame } from './models';

function getGameDef(game: SharedGame) {
  return GAMES.find(g => g.id === game.gameType);
}

@Pipe({name: 'gamespeed'})
export class GameSpeedPipe implements PipeTransform {
  transform(game: SharedGame): string {
    const speed = getGameDef(game).gameSpeeds.find(s => s.key === game.gameSpeed);
    return speed ? speed.displayName : 'Other / Custom Speed';
  }
}

@Pipe({name: 'map'})
export class MapPipe implements PipeTransform {
  transform(game: SharedGame): string {
    const map = getGameDef(game).maps.find(m => m.file === game.mapFile);
    return map ? map.displayName : 'Other / Custom Map';
  }
}

@Pipe({name: 'mapsize'})
export class MapSizePipe implements PipeTransform {
  transform(game: SharedGame): string {
    const size = getGameDef(game).mapSizes.find(s => s.key === game.mapSize);
    return size ? size.displayName : 'Other / Custom Size';
  }
}
