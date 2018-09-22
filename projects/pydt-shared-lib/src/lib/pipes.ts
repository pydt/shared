import { Pipe, PipeTransform } from '@angular/core';
import { CIV6_GAME_SPEEDS, CIV6_MAPS, CIV6_MAP_SIZES } from './civdefs.service';

@Pipe({name: 'civ6gamespeed'})
export class Civ6GameSpeedPipe implements PipeTransform {
  transform(value: string): string {
    for (const gs of CIV6_GAME_SPEEDS) {
      if (gs.key === value) {
        return gs.displayName;
      }
    }

    return '';
  }
}

@Pipe({name: 'civ6map'})
export class Civ6MapPipe implements PipeTransform {
  transform(value: string): string {
    for (const map of CIV6_MAPS) {
      if (map.file === value) {
        return map.displayName;
      }
    }

    return '';
  }
}

@Pipe({name: 'civ6mapsize'})
export class Civ6MapSizePipe implements PipeTransform {
  transform(value: string): string {
    for (const ms of CIV6_MAP_SIZES) {
      if (ms.key === value) {
        return ms.displayName;
      }
    }

    return '';
  }
}
