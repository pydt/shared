import { Inject, Injectable, InjectionToken, Optional } from "@angular/core";
import { Game, SteamProfile, UserService } from "./_gen/swagger/api";
import { firstValueFrom } from "rxjs";

export const CACHE_INVALIDATION_MINUTES_TOKEN = new InjectionToken("CACHE_INVALIDATION_MINUTES_TOKEN");

interface SteamProfileWithInvalidDate extends SteamProfile {
  invalidDate?: Date;
}

export interface SteamProfileMap {
  [index: string]: SteamProfile;
}

@Injectable()
export class ProfileCacheService {
  private cache: SteamProfileMap = {};
  private lastRequest: Promise<SteamProfileMap> = Promise.resolve({});

  constructor(
    private api: UserService,
    @Optional() @Inject(CACHE_INVALIDATION_MINUTES_TOKEN) private cacheInvalidationMinutes: number,
  ) {
    this.cacheInvalidationMinutes = this.cacheInvalidationMinutes || 60;
  }

  getProfilesForGames(games: Game[]) {
    const steamIds = games
      .map(x => x.players)
      .reduce((a, b) => a.concat(b), [])
      .map(x => x.steamId);

    return this.getProfiles([...new Set(steamIds)] as string[]);
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
    this.lastRequest = this.lastRequest.then(async () => {
      const result: SteamProfileMap = {};

      try {
        const toDownload: string[] = [];

        for (const steamId of steamIds) {
          if (steamId) {
            const cachedVal = this.cache[steamId] as SteamProfileWithInvalidDate;

            if (cachedVal) {
              result[steamId] = this.cache[steamId];
            }

            if (!cachedVal || (cachedVal.invalidDate && new Date() > cachedVal.invalidDate)) {
              toDownload.push(steamId);
            }
          }
        }

        if (toDownload.length) {
          const profiles = await firstValueFrom(this.api.steamProfiles(toDownload.join(",")));

          for (const profile of profiles || []) {
            (profile as SteamProfileWithInvalidDate).invalidDate = new Date(
              new Date().getTime() + this.cacheInvalidationMinutes * 60 * 1000,
            );
            result[profile.steamid] = this.cache[profile.steamid] = profile;
          }
        }
      } catch (e) {
        // This promise should NEVER throw, otherwise the lastRequest chain aborts and can never recover!
        // eslint-disable-next-line no-console
        console.error(e);
      }

      return result;
    });

    return this.lastRequest;
  }
}
