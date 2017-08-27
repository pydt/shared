import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { SteamProfile, Game } from "./entity";
import * as _ from 'lodash';

@Injectable()
export class ProfileCacheService {
  private cache = new Map<string, SteamProfile>();
  private lastRequest = Promise.resolve(new Map<string, SteamProfile>());

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

  getProfiles(steamIds: string[]): Promise<Map<string, SteamProfile>> {
    return this.lastRequest = this.lastRequest.then(() => {
      let result = new Map<string, SteamProfile>();
      let toDownload: string[] = [];

      for (let steamId of steamIds) {
        if (steamId) {
          if (this.cache[steamId]) {
            result[steamId] = this.cache[steamId];
          } else {
            toDownload.push(steamId);
          }
        }
      }

      if (toDownload.length) {
        return this.api.getSteamProfiles(toDownload).then(profiles => {
          for (let profile of profiles) {
            this.cache[profile.steamid] = profile;
            result[profile.steamid] = profile;
          }

          return result;
        });
      }

      return Promise.resolve(result);
    });
  }
}
