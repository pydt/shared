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
  constructor(public id: string, public displayName: string) {
  }
}

export const CIV6_DLCS: DLC[] = [
  new DLC('02A8BDDE-67EA-4D38-9540-26E685E3156E', 'Aztec Civilization Pack'),
  new DLC('3809975F-263F-40A2-A747-8BFB171D821A', 'Poland Civilization & Scenario Pack'),
  new DLC('2F6E858A-28EF-46B3-BEAC-B985E52E9BC1', 'Vikings Scenario Pack'),
  new DLC('E3F53C61-371C-440B-96CE-077D318B36C0', 'Australia Civilization & Scenario Pack'),
  new DLC('E2749E9A-8056-45CD-901B-C368C8E83DEB', 'Persia and Macedon Civilization & Scenario Pack'),
  new DLC('643EA320-8E1A-4CF1-A01C-00D88DDD131A', 'Nubia Civilization & Scenario Pack'),
  new DLC('1F367231-A040-4793-BDBB-088816853683', 'Khmer and Indonesia Civilization & Scenario Pack')
];

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

export const CIV6_LEADERS = [
  RANDOM_CIV,
  new CivDef('CIVILIZATION_MACEDON', 'LEADER_ALEXANDER', null, 'E2749E9A-8056-45CD-901B-C368C8E83DEB'),
  new CivDef('CIVILIZATION_NUBIA', 'LEADER_AMANITORE', null, '643EA320-8E1A-4CF1-A01C-00D88DDD131A'),
  new CivDef('CIVILIZATION_FRANCE', 'LEADER_CATHERINE_DE_MEDICI'),
  new CivDef('CIVILIZATION_EGYPT', 'LEADER_CLEOPATRA'),
  new CivDef('CIVILIZATION_PERSIA', 'LEADER_CYRUS', null, 'E2749E9A-8056-45CD-901B-C368C8E83DEB'),
  new CivDef('CIVILIZATION_GERMANY', 'LEADER_BARBAROSSA', 'Frederick Barbarossa'),
  new CivDef('CIVILIZATION_INDIA', 'LEADER_GANDHI'),
  new CivDef('CIVILIZATION_SUMERIA', 'LEADER_GILGAMESH'),
  new CivDef('CIVILIZATION_INDONESIA', 'LEADER_GITARJA', null, '1F367231-A040-4793-BDBB-088816853683'),
  new CivDef('CIVILIZATION_GREECE', 'LEADER_GORGO'),
  new CivDef('CIVILIZATION_NORWAY', 'LEADER_HARDRADA', 'Harald Hardrada'),
  new CivDef('CIVILIZATION_JAPAN', 'LEADER_HOJO', 'Hojo Tokimune'),
  new CivDef('CIVILIZATION_POLAND', 'LEADER_JADWIGA', null, '3809975F-263F-40A2-A747-8BFB171D821A'),
  new CivDef('CIVILIZATION_KHMER', 'LEADER_JAYAVARMAN', null, '1F367231-A040-4793-BDBB-088816853683'),
  new CivDef('CIVILIZATION_AUSTRALIA', 'LEADER_JOHN_CURTIN', null, 'E3F53C61-371C-440B-96CE-077D318B36C0'),
  new CivDef('CIVILIZATION_AZTEC', 'LEADER_MONTEZUMA', null, '02A8BDDE-67EA-4D38-9540-26E685E3156E'),
  new CivDef('CIVILIZATION_KONGO', 'LEADER_MVEMBA', 'Mvemba a Nzinga'),
  new CivDef('CIVILIZATION_BRAZIL', 'LEADER_PEDRO', 'Pedro II'),
  new CivDef('CIVILIZATION_GREECE', 'LEADER_PERICLES'),
  new CivDef('CIVILIZATION_RUSSIA', 'LEADER_PETER_GREAT', 'Peter the Great'),
  new CivDef('CIVILIZATION_SPAIN', 'LEADER_PHILIP_II', 'Philip II'),
  new CivDef('CIVILIZATION_CHINA', 'LEADER_QIN', 'Qin Shi Huang'),
  new CivDef('CIVILIZATION_ARABIA', 'LEADER_SALADIN'),
  new CivDef('CIVILIZATION_AMERICA', 'LEADER_T_ROOSEVELT', 'Teddy Roosevelt'),
  new CivDef('CIVILIZATION_SCYTHIA', 'LEADER_TOMYRIS'),
  new CivDef('CIVILIZATION_ROME', 'LEADER_TRAJAN'),
  new CivDef('CIVILIZATION_ENGLAND', 'LEADER_VICTORIA')
];

export class GameSpeed {
  constructor(public key: string, public displayName: string) {
  }
}

export const CIV6_GAME_SPEEDS = new Array<GameSpeed>(
  new GameSpeed('GAMESPEED_ONLINE', 'Online'),
  new GameSpeed('GAMESPEED_QUICK', 'Quick'),
  new GameSpeed('GAMESPEED_STANDARD', 'Standard'),
  new GameSpeed('GAMESPEED_EPIC', 'Epic'),
  new GameSpeed('GAMESPEED_MARATHON', 'Marathon')
);

export class MapSize {
  constructor(public key: string, public displayName: string, public players: number) {
  }
}

export const CIV6_MAP_SIZES = new Array<MapSize>(
  new MapSize('MAPSIZE_DUEL', 'Duel', 2),
  new MapSize('MAPSIZE_TINY', 'Tiny', 4),
  new MapSize('MAPSIZE_SMALL', 'Small', 6),
  new MapSize('MAPSIZE_STANDARD', 'Standard', 8),
  new MapSize('MAPSIZE_LARGE', 'Large', 10),
  new MapSize('MAPSIZE_HUGE', 'Huge', 12)
);

export class Map {
  constructor(public file: string, public displayName: string, public mapSize?: MapSize) {
  }
}

export const CIV6_MAPS = new Array<Map>(
  new Map('Continents.lua', 'Continents'),
  new Map('Fractal.lua', 'Fractal'),
  new Map('InlandSea.lua', 'Inland Sea'),
  new Map('Island_Plates.lua', 'Island Plates'),
  new Map('Pangaea.lua', 'Pangaea'),
  new Map('Shuffle.lua', 'Shuffle'),
  new Map('Balanced4.Civ6Map', '4-Leaf Clover', CIV6_MAP_SIZES[1]),
  new Map('Balanced6.Civ6Map', '6-Armed Snowflake', CIV6_MAP_SIZES[2]),
  new Map('EarthStandard.Civ6Map', 'Earth Map', CIV6_MAP_SIZES[3])
);
