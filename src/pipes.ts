import { Pipe, PipeTransform } from '@angular/core';
import { Civ6GameSpeeds, Civ6Maps, Civ6MapSizes } from './civdefs.service';

@Pipe({name: 'civ6gamespeed'})
export class Civ6GameSpeedPipe implements PipeTransform {
  transform(value: string): string {
    for (let gs of Civ6GameSpeeds) {
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
    for (let map of Civ6Maps) {
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
    for (let ms of Civ6MapSizes) {
      if (ms.key === value) {
        return ms.displayName;
      }
    }

    return '';
  }
}
