export interface CivGame {
  id: string;
  displayName: string;
  turnTimerSupported: boolean;
  assetPrefix: string;
  leaders: CivDef[];
  dlcs: DLC[];
  gameSpeeds: GameSpeed[];
  mapSizes: MapSize[];
  maps: Map[];
  saveLocations: { [key in Platform]: PlatformSaveLocation };
  dataPaths: { [key in GameStore]?: string };
  savePath: string;
  saveExtension: string;
  runUrls: { [key in GameStore]?: string };
}

export enum Platform {
  Windows = 'win32',
  OSX = 'darwin',
  Linux = 'linux'
}

export enum GameStore {
  Steam = 'steam',
  Epic = 'epic'
}

export enum BasePath {
  APP_DATA = 'appData',
  HOME = 'home',
  DOCUMENTS = 'documents'
}

export class PlatformSaveLocation {
  basePath: BasePath;
  prefix: string;
}

export class CivDef {
  public civDisplayName: string;
  public leaderDisplayName: string;

  constructor(public civKey: string, public leaderKey: string, public options: CivDefOptions = {}) {
    this.civDisplayName = this.defaultDisplayName(civKey);
    this.leaderDisplayName = options.leaderDisplayName || this.defaultDisplayName(leaderKey);
  }

  getImageFileName() {
    return `${this.civKey.replace('CIVILIZATION_', '')}_${this.leaderKey.replace('LEADER_', '')}.png`;
  }

  getFullDisplayName() {
    let result = this.leaderDisplayName;

    if (!this.options.justShowLeaderName) {
      result += ` (${this.civDisplayName})`;
    }

    return result;
  }

  private defaultDisplayName(str: string) {
    str = str.replace('CIVILIZATION_', '').replace('LEADER_', '').replace(/_/g, ' ');

    return str.replace(/\w\S*/g, txt => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}

export interface CivDefOptions {
  leaderDisplayName?: string;
  dlcId?: string;
  justShowLeaderName?: boolean;
}

export class DLC {
  constructor(public id: string, public displayName: string, public major = false) {
  }
}

export function filterCivsByDlc(leaders: CivDef[], dlcIds: string[]) {
  const result: CivDef[] = [];
  dlcIds = dlcIds || [];

  for (const leader of leaders) {
    if (!leader.options.dlcId || dlcIds.indexOf(leader.options.dlcId) >= 0) {
      result.push(leader);
    }
  }

  return result;
}

export const RANDOM_CIV = new CivDef('CIVILIZATION_RANDOM', 'LEADER_RANDOM', {
  leaderDisplayName: 'Random Leader',
  justShowLeaderName: true
});

export class GameSpeed {
  constructor(public key: string, public displayName: string) {
  }
}

export class MapSize {
  constructor(public key: string, public displayName: string, public players: number) {
  }
}

export class Map {
  constructor(public file: string, public displayName: string, public mapSize?: MapSize, public regex?: RegExp) {
  }
}
