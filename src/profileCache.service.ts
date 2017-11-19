import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProfileCacheService {
  private cache: PcsProfileMap = {};
  private lastRequest: Promise<PcsProfileMap> = Promise.resolve({});

  constructor (private api: PcsApi) {
  }

  getProfilesForGames(games: PcsGame[]) {
    const steamIds = _.chain(games)
      .map('players')
      .flatten()
      .map('steamId')
      .uniq()
      .value() as string[];

    return this.getProfiles(steamIds);
  }

  getProfilesForGame(game: PcsGame) {
    return this.getProfilesForGames([game]);
  }

  getProfiles(steamIds: string[]): Promise<PcsProfileMap> {
    return this.lastRequest = this.lastRequest.then(() => {
      const result: PcsProfileMap = {};
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
        return this.api.userSteamProfiles(toDownload.join(',')).toPromise().then(profiles => {
          for (const profile of profiles) {
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

export interface PcsGame {
  players: {
    steamId: string;
  }[];
}

export interface PcsSteamProfile {
  steamid: string;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
}

export interface PcsProfileMap {
  [index: string]: PcsSteamProfile;
};

export interface PcsApi {
  userSteamProfiles(steamIds: string): Observable<PcsSteamProfile[]>;
}
