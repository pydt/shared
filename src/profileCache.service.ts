import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SteamProfile, Game } from './entity';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';
import 'rxjs/add/observable/of';

@Injectable()
export class ProfileCacheService {
  private cache = new Map<string, SteamProfile>();
  private lastRequest: Observable<Map<string, SteamProfile>> = new BehaviorSubject(new Map<string, SteamProfile>());

  constructor (private api: ApiService) {
  }

  getProfilesForGames(games: Game[]) {
    const steamIds = _.chain(games)
      .map('players')
      .flatten()
      .map('steamId')
      .uniq()
      .value() as string[];

    return this.getProfiles(steamIds);
  }

  getProfilesForGame(game: Game) {
    return this.getProfilesForGames([game]);
  }

  getProfiles(steamIds: string[]): Observable<Map<string, SteamProfile>> {
    return this.lastRequest = this.lastRequest.flatMap(() => {
      const result = new Map<string, SteamProfile>();
      const toDownload: string[] = [];

      for (const steamId of steamIds) {
        if (steamId) {
          if (this.cache[steamId]) {
            result[steamId] = this.cache[steamId];
          } else {
            toDownload.push(steamId);
          }
        }
      }

      if (toDownload.length) {
        return this.api.getSteamProfiles(toDownload).map(profiles => {
          for (const profile of profiles) {
            this.cache[profile.steamid] = profile;
            result[profile.steamid] = profile;
          }

          return result;
        });
      }

      return Observable.of(result);
    });
  }
}
