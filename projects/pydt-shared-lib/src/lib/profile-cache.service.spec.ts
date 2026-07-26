import { Observable, of, throwError } from "rxjs";
import { Game, GamePlayer, SteamProfile, UserService } from "./_gen/swagger/api";
import { ProfileCacheService } from "./profile-cache.service";

interface FakeUserService {
  steamProfiles: jasmine.Spy<(steamIds: string) => Observable<SteamProfile[]>>;
}

const buildProfile = (steamid: string, personaname = "Player"): SteamProfile => ({
  steamid,
  personaname,
  profileurl: "",
  avatar: "",
  avatarmedium: "",
  avatarfull: "",
});

const buildGame = (players: GamePlayer[]): Game => ({
  gameType: "CIV6",
  displayName: "Test Game",
  dlc: [],
  slots: players.length,
  humans: players.length,
  gameId: "game-1",
  createdBySteamId: "1",
  players,
  currentPlayerSteamId: "1",
});

describe("ProfileCacheService", () => {
  let api: FakeUserService;
  let service: ProfileCacheService;

  beforeEach(() => {
    api = { steamProfiles: jasmine.createSpy("steamProfiles") };
    service = new ProfileCacheService(api as unknown as UserService, 60);
  });

  it("fetches uncached profiles from the API", async () => {
    api.steamProfiles.and.returnValue(of([buildProfile("111", "Alice")]));

    const result = await service.getProfiles(["111"]);

    expect(result["111"].personaname).toBe("Alice");
    expect(api.steamProfiles).toHaveBeenCalledWith("111");
  });

  it("returns cached profiles without calling the API again", async () => {
    api.steamProfiles.and.returnValue(of([buildProfile("111", "Alice")]));

    await service.getProfiles(["111"]);
    const result = await service.getProfiles(["111"]);

    expect(result["111"].personaname).toBe("Alice");
    expect(api.steamProfiles).toHaveBeenCalledTimes(1);
  });

  it("ignores falsy steam IDs", async () => {
    api.steamProfiles.and.returnValue(of([buildProfile("111")]));

    await service.getProfiles(["", "111"]);

    expect(api.steamProfiles).toHaveBeenCalledWith("111");
  });

  it("re-fetches a profile after clearProfile evicts it from the cache", async () => {
    api.steamProfiles.and.returnValue(of([buildProfile("111")]));

    await service.getProfiles(["111"]);
    service.clearProfile("111");
    await service.getProfiles(["111"]);

    expect(api.steamProfiles).toHaveBeenCalledTimes(2);
  });

  it("re-fetches a profile once its cache entry has expired", async () => {
    // A tiny (sub-millisecond-scale) invalidation window lets this test wait out a real expiry
    // instead of mocking the clock, which conflicts with zone.js's patched timers in this environment.
    service = new ProfileCacheService(api as unknown as UserService, 1 / 60000);
    api.steamProfiles.and.returnValue(of([buildProfile("111")]));

    await service.getProfiles(["111"]);
    await new Promise(resolve => setTimeout(resolve, 50));
    await service.getProfiles(["111"]);

    expect(api.steamProfiles).toHaveBeenCalledTimes(2);
  });

  it("dedupes steam IDs across all players in all games", async () => {
    api.steamProfiles.and.returnValue(of([buildProfile("111"), buildProfile("222")]));

    const game1 = buildGame([
      { steamId: "111", civType: "LEADER_A" },
      { steamId: "", civType: "LEADER_B" },
    ]);
    const game2 = buildGame([
      { steamId: "111", civType: "LEADER_A" },
      { steamId: "222", civType: "LEADER_C" },
    ]);

    const result = await service.getProfilesForGames([game1, game2]);

    expect(Object.keys(result)).toEqual(["111", "222"]);
    expect(api.steamProfiles).toHaveBeenCalledWith("111,222");
  });

  it("recovers after a failed request instead of getting stuck", async () => {
    spyOn(console, "error");
    api.steamProfiles.and.returnValue(throwError(() => new Error("boom")));

    const failedResult = await service.getProfiles(["111"]);

    expect(failedResult).toEqual({});
    expect(console.error).toHaveBeenCalled();

    api.steamProfiles.and.returnValue(of([buildProfile("111")]));

    const recoveredResult = await service.getProfiles(["111"]);

    expect(recoveredResult["111"]).toBeTruthy();
  });
});
