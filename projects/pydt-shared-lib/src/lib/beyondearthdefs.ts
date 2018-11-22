import { BasePath, CivDef, CivGame, DLC, GameSpeed, Map, MapSize, Platform, RANDOM_CIV } from "./civdefs";

class BeyondEarthDef extends CivDef {
    getImageFileName() {
        return `${BEYOND_EARTH_GAME.assetPrefix}${this.civKey.replace('CIVILIZATION_', '')}_${this.leaderKey.replace('LEADER_', '')}.png`;
    }
}

export const BEYOND_EARTH_DLCS: DLC[] = [
    new DLC('54df493fb668d144a930a168628faa59', 'Exoplanets Map Pack'),
    new DLC('57b2d25491c545408f17a69f033166c7', 'Rising Tide', true)
];

export const BEYOND_EARTH_LEADERS = [
    RANDOM_CIV,
    new BeyondEarthDef('CIVILIZATION_ARC', 'LEADER_ARC', 'American Reclamation Corporation'),
    new BeyondEarthDef('CIVILIZATION_AFRICAN_UNION', 'LEADER_AFRICAN_UNION', 'People\'s African Union'),
    new BeyondEarthDef('CIVILIZATION_BRASILIA', 'LEADER_BRASILIA'),
    new BeyondEarthDef('CIVILIZATION_PAN_ASIA', 'LEADER_PAN_ASIA', 'Pan-Asian Cooperative'),
    new BeyondEarthDef('CIVILIZATION_FRANCO_IBERIA', 'LEADER_FRANCO_IBERIA', 'Franco-Iberia'),
    new BeyondEarthDef('CIVILIZATION_KAVITHAN', 'LEADER_INDIA', 'Kavithan Protectorate'),
    new BeyondEarthDef('CIVILIZATION_POLYSTRALIA', 'LEADER_POLYSTRALIA'),
    new BeyondEarthDef('CIVILIZATION_RUSSIA', 'LEADER_RUSSIA', 'Slavic Federation'),
    new BeyondEarthDef('CIVILIZATION_AL_FALAH', 'LEADER_AL_FALAH', null, '57b2d25491c545408f17a69f033166c7'),
    new BeyondEarthDef('CIVILIZATION_NORTH_SEA_ALLIANCE', 'LEADER_NORTH_SEA_ALLIANCE', null, '57b2d25491c545408f17a69f033166c7'),
    new BeyondEarthDef('CIVILIZATION_INTEGR', 'LEADER_INTEGR', 'INTEGR', '57b2d25491c545408f17a69f033166c7'),
    new BeyondEarthDef('CIVILIZATION_CHUNGSU', 'LEADER_CHUNGSU', null, '57b2d25491c545408f17a69f033166c7')
];

export const BEYOND_EARTH_GAME_SPEEDS = new Array<GameSpeed>(
    new GameSpeed('GAMESPEED_QUICK', 'Quick'),
    new GameSpeed('GAMESPEED_STANDARD', 'Standard'),
    new GameSpeed('GAMESPEED_EPIC', 'Epic'),
    new GameSpeed('GAMESPEED_MARATHON', 'Marathon')
);

export const BEYOND_EARTH_MAP_SIZES = new Array<MapSize>(
    new MapSize('WORLDSIZE_DUEL', 'Duel', 2),
    new MapSize('WORLDSIZE_TINY', 'Tiny', 4),
    new MapSize('WORLDSIZE_SMALL', 'Small', 6),
    new MapSize('WORLDSIZE_STANDARD', 'Standard', 8),
    new MapSize('WORLDSIZE_LARGE', 'Massive', 8)
);

export const BEYOND_EARTH_MAPS = new Array<Map>(
    new Map('Assets\\Maps\\Protean.lua', 'Protean'),
);

export const BEYOND_EARTH_GAME: CivGame = {
    id: 'BEYOND_EARTH',
    displayName: 'Beyond Earth',
    turnTimerSupported: true,
    assetPrefix: 'BEYOND_EARTH_',
    dlcs: BEYOND_EARTH_DLCS,
    gameSpeeds: BEYOND_EARTH_GAME_SPEEDS,
    leaders: BEYOND_EARTH_LEADERS,
    maps: BEYOND_EARTH_MAPS,
    mapSizes: BEYOND_EARTH_MAP_SIZES,
    saveLocations: {
        [Platform.Windows]: { basePath: BasePath.DOCUMENTS, prefix: '/My Games' },
        [Platform.OSX]: { basePath: BasePath.APP_DATA, prefix: '' },
        [Platform.Linux]: { basePath: BasePath.HOME, prefix: '/.local/share/aspyr-media' }
    },
    saveDirectory: '/Sid Meier\'s Civilization Beyond Earth/Saves/hotseat/',
    saveExtension: 'CivBESave',
    steamRunUrl: 'steam://run/65980//\\dx11'
};
