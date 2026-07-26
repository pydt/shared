import { CivGame, Game } from "./_gen/swagger/api";
import {
  GameSpeedPipe,
  MapPipe,
  MapSizePipe,
  RandomOnlyPipe,
  RANDOM_ONLY_OPTIONS,
  TurnTimerVacationPipe,
  TURN_TIMER_VACATION_OPTIONS,
} from "./pipes";

const buildGame = (overrides: Partial<Game> = {}): Game => ({
  gameType: "CIV6",
  displayName: "Test Game",
  dlc: [],
  slots: 1,
  humans: 1,
  gameId: "game-1",
  createdBySteamId: "1",
  players: [],
  currentPlayerSteamId: "1",
  ...overrides,
});

const buildCivGame = (overrides: Partial<CivGame> = {}): CivGame => ({
  id: "CIV6",
  displayName: "Civilization VI",
  turnTimerSupported: true,
  assetPrefix: "",
  leaders: [],
  dlcs: [],
  gameSpeeds: [{ key: "STANDARD", displayName: "Standard Speed" }],
  mapSizes: [{ key: "SMALL", displayName: "Small", players: 4 }],
  maps: [{ file: "Continents.lua", displayName: "Continents" }],
  saveLocations: {},
  dataPaths: {},
  savePath: "",
  saveExtension: "Civ6Save",
  runUrls: {},
  awaitWriteFinish: false,
  ...overrides,
});

describe("GameSpeedPipe", () => {
  const pipe = new GameSpeedPipe();

  it("returns an empty string when games metadata isn't loaded yet", () => {
    expect(pipe.transform(buildGame(), undefined as unknown as CivGame[])).toBe("");
  });

  it("returns the matching speed's display name", () => {
    const game = buildGame({ gameSpeed: "STANDARD" });

    expect(pipe.transform(game, [buildCivGame()])).toBe("Standard Speed");
  });

  it("falls back to 'Other / Custom Speed' when there's no match", () => {
    const game = buildGame({ gameSpeed: "UNKNOWN_SPEED" });

    expect(pipe.transform(game, [buildCivGame()])).toBe("Other / Custom Speed");
  });
});

describe("MapPipe", () => {
  const pipe = new MapPipe();

  it("returns an empty string when games metadata isn't loaded yet", () => {
    expect(pipe.transform(buildGame(), undefined as unknown as CivGame[])).toBe("");
  });

  it("returns the matching map's display name", () => {
    const game = buildGame({ mapFile: "Continents.lua" });

    expect(pipe.transform(game, [buildCivGame()])).toBe("Continents");
  });

  it("falls back to 'Other / Custom Map' when there's no match", () => {
    const game = buildGame({ mapFile: "UnknownMap.lua" });

    expect(pipe.transform(game, [buildCivGame()])).toBe("Other / Custom Map");
  });
});

describe("MapSizePipe", () => {
  const pipe = new MapSizePipe();

  it("returns an empty string when games metadata isn't loaded yet", () => {
    expect(pipe.transform(buildGame(), undefined as unknown as CivGame[])).toBe("");
  });

  it("returns the matching size's display name", () => {
    const game = buildGame({ mapSize: "SMALL" });

    expect(pipe.transform(game, [buildCivGame()])).toBe("Small");
  });

  it("falls back to 'Other / Custom Size' when there's no match", () => {
    const game = buildGame({ mapSize: "UNKNOWN_SIZE" });

    expect(pipe.transform(game, [buildCivGame()])).toBe("Other / Custom Size");
  });
});

describe("RandomOnlyPipe", () => {
  const pipe = new RandomOnlyPipe();

  it("returns the matching option's label", () => {
    const game = buildGame({ randomOnly: "FORCE_RANDOM" });

    expect(pipe.transform(game)).toBe(RANDOM_ONLY_OPTIONS.find(x => x.key === "FORCE_RANDOM")?.label ?? "");
  });

  it("falls back to the first option when unset", () => {
    expect(pipe.transform(buildGame())).toBe(RANDOM_ONLY_OPTIONS[0].label);
  });
});

describe("TurnTimerVacationPipe", () => {
  const pipe = new TurnTimerVacationPipe();

  it("returns the matching option's label", () => {
    const game = buildGame({ turnTimerVacationHandling: "PAUSE" });

    expect(pipe.transform(game)).toBe(TURN_TIMER_VACATION_OPTIONS.find(x => x.key === "PAUSE")?.label ?? "");
  });

  it("falls back to the first option when unset", () => {
    expect(pipe.transform(buildGame())).toBe(TURN_TIMER_VACATION_OPTIONS[0].label);
  });
});
