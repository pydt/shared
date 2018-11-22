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
  saveDirectory: string;
  saveExtension: string;
  steamRunUrl: string;
}

export enum Platform {
  Windows,
  OSX,
  Linux
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

  constructor(public civKey: string, public leaderKey: string, leaderDisplayName?: string, public dlcId?: string) {
    this.civDisplayName = this.defaultDisplayName(civKey);
    this.leaderDisplayName = leaderDisplayName || this.defaultDisplayName(leaderKey);
  }

  getImageFileName() {
    return `${this.civKey.replace('CIVILIZATION_', '')}_${this.leaderKey.replace('LEADER_', '')}.png`;
  }

  getFullDisplayName() {
    return `${this.leaderDisplayName} (${this.civDisplayName})`;
  }

  private defaultDisplayName(str: string) {
    str = str.replace('CIVILIZATION_', '').replace('LEADER_', '').replace(/_/g, ' ');

    return str.replace(/\w\S*/g, txt => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}

export class DLC {
  constructor(public id: string, public displayName: string, public major = false) {
  }
}

export function filterCivsByDlc(leaders: CivDef[], dlcIds: string[]) {
  const result: CivDef[] = [];
  dlcIds = dlcIds || [];

  for (const leader of leaders) {
    if (!leader.dlcId || dlcIds.indexOf(leader.dlcId) >= 0) {
      result.push(leader);
    }
  }

  return result;
}

export const RANDOM_CIV = new CivDef('CIVILIZATION_RANDOM', 'LEADER_RANDOM', 'Random Leader');

export class GameSpeed {
  constructor(public key: string, public displayName: string) {
  }
}

export class MapSize {
  constructor(public key: string, public displayName: string, public players: number) {
  }
}

export class Map {
  constructor(public file: string, public displayName: string, public mapSize?: MapSize) {
  }
}
