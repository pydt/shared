import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Game, SteamProfile, UserService } from './_gen/swagger/api';

export const CACHE_INVALIDATION_MINUTES_TOKEN = new InjectionToken('CACHE_INVALIDATION_MINUTES_TOKEN');

@Injectable()
export class ProfileCacheService {
  private cache: SteamProfileMap = {};
  private lastRequest: Promise<SteamProfileMap> = Promise.resolve({});

  constructor (private api: UserService, @Optional() @Inject(CACHE_INVALIDATION_MINUTES_TOKEN) private cacheInvalidationMinutes: number) {
    this.cacheInvalidationMinutes = this.cacheInvalidationMinutes || 60;
  }

  getProfilesForGames(games: Game[]) {
    const steamIds = games
      .map(x => x.players)
      .reduce((a, b) => a.concat(b), [])
      .map(x => x.steamId);

    return this.getProfiles([...new Set(steamIds)]);
  }

  clearProfile(steamId: string) {
    if (this.cache[steamId]) {
      delete this.cache[steamId];
    }
  }

  getProfilesForGame(game: Game) {
    return this.getProfilesForGames([game]);
  }

  getProfiles(steamIds: string[]): Promise<SteamProfileMap> {
    return this.lastRequest = this.lastRequest.then(async () => {
      const result: SteamProfileMap = {};

      try {
        const toDownload: string[] = [];

        for (const steamId of steamIds) {
          if (steamId) {
            const cachedVal = <SteamProfileWithInvalidDate>this.cache[steamId];

            if (cachedVal) {
              result[steamId] = this.cache[steamId];
            }

            if (!cachedVal || new Date() > cachedVal.invalidDate) {
              toDownload.push(steamId);
            }
          }
        }

        if (toDownload.length) {
          const profiles = await this.api.steamProfiles(toDownload.join(',')).toPromise();

          for (const profile of profiles) {
            (<SteamProfileWithInvalidDate>profile).invalidDate = new Date(
              new Date().getTime() +
              this.cacheInvalidationMinutes * 60 * 1000
            );
            result[profile.steamid] = this.cache[profile.steamid] = profile;
          }
        }
      } catch (e) {
        // This promise should NEVER throw, otherwise the lastRequest chain aborts and can never recover!
        console.error(e);
      }

      return result;
    });
  }
}

interface SteamProfileWithInvalidDate extends SteamProfile {
  invalidDate?: Date;
}

export interface SteamProfileMap {
  [index: string]: SteamProfile;
}
