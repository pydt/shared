import { Component, OnInit } from "@angular/core";
import { CivDef, CivGame, Game, GamePlayer, SteamProfileMap } from "pydt-shared-lib";

const svgDataUri = (svg: string): string => `data:image/svg+xml;base64,${btoa(svg)}`;

// The shared component always requests images from https://playyourdamnturn.com/img/civs/<imageFileName>,
// so for this local demo we intercept those specific requests and swap in local placeholder SVGs.
const DEMO_IMAGE_OVERRIDES: Record<string, string> = {
  "LEADER_TRAJAN.jpg": svgDataUri(
    '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><rect width="128" height="128" fill="#8a5a2b"/><text x="64" y="68" font-size="14" text-anchor="middle" fill="white">TRAJAN</text></svg>',
  ),
  "CIVILIZATION_ROME.jpg": svgDataUri(
    '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="#a83232"/><text x="32" y="36" font-size="10" text-anchor="middle" fill="white">ROME</text></svg>',
  ),
};

@Component({
  selector: "pydt-shared",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: false,
})
export class AppComponent implements OnInit {
  title = "pydt-shared";

  ngOnInit(): void {
    const descriptor = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "src");

    if (!descriptor?.set || !descriptor.get) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/unbound-method -- rebinding via .call(this, ...) below is intentional
    const originalSet: (this: HTMLImageElement, value: string) => void = descriptor.set;
    // eslint-disable-next-line @typescript-eslint/unbound-method -- rebinding via .call(this) below is intentional
    const originalGet: (this: HTMLImageElement) => string = descriptor.get;

    Object.defineProperty(HTMLImageElement.prototype, "src", {
      set: function (this: HTMLImageElement, value: string) {
        const fileName = Object.keys(DEMO_IMAGE_OVERRIDES).find(key => value.endsWith(key));

        originalSet.call(this, fileName ? DEMO_IMAGE_OVERRIDES[fileName] : value);
      },
      get: function (this: HTMLImageElement): string {
        return originalGet.call(this) as string;
      },
    });
  }

  leaderDef: CivDef = {
    civKey: "",
    leaderKey: "LEADER_TRAJAN",
    imageFileName: "LEADER_TRAJAN.jpg",
    fullDisplayName: "Trajan",
    civDisplayName: "",
    leaderDisplayName: "Trajan",
    options: {},
  };

  civilizationDef: CivDef = {
    civKey: "CIVILIZATION_ROME",
    leaderKey: "",
    imageFileName: "CIVILIZATION_ROME.jpg",
    fullDisplayName: "Rome",
    civDisplayName: "Rome",
    leaderDisplayName: "",
    options: {},
  };

  civGame: CivGame = {
    id: "CIV7",
    displayName: "Civilization VII",
    turnTimerSupported: true,
    assetPrefix: "",
    leaders: [this.leaderDef],
    separateLeaderCiv: true,
    civilizations: [this.civilizationDef],
    dlcs: [],
    gameSpeeds: [],
    mapSizes: [],
    maps: [],
    saveLocations: {},
    dataPaths: {},
    savePath: "",
    saveExtension: "Civ7Save",
    runUrls: {},
  };

  player: GamePlayer = {
    steamId: "1",
    civType: "LEADER_TRAJAN",
    civilization: "CIVILIZATION_ROME",
  };

  game: Game = {
    gameType: "CIV7",
    displayName: "Demo Game",
    dlc: [],
    slots: 1,
    humans: 1,
    gameId: "demo",
    createdBySteamId: "1",
    players: [this.player],
    currentPlayerSteamId: "1",
    inProgress: true,
  };

  gamePlayers: GamePlayer[] = [this.player];
  civDefs: CivDef[] = [this.leaderDef];
  gamePlayerProfiles: SteamProfileMap = {
    "1": {
      steamid: "1",
      personaname: "Test Player",
      profileurl: "",
      avatar: "",
      avatarmedium:
        "data:image/svg+xml;base64," +
        btoa(
          '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="#3366cc"/><text x="50" y="55" font-size="14" text-anchor="middle" fill="white">PROFILE</text></svg>',
        ),
      avatarfull: "",
    },
  };
}
