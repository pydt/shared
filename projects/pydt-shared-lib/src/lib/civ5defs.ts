import { DLC, CivDef, RANDOM_CIV, GameSpeed, Map, MapSize, CivGame } from "./civdefs";

class Civ5Def extends CivDef {
    getImageFileName() {
        return `CIV5_${this.civKey.replace('CIVILIZATION_', '')}_${this.leaderKey.replace('LEADER_', '')}.png`;
    }
}

export const CIV5_DLCS: DLC[] = [
];

export const CIV5_LEADERS = [
    RANDOM_CIV,
    new Civ5Def('CIVILIZATION_AMERICA', 'LEADER_WASHINGTON'),
    new Civ5Def('CIVILIZATION_ARABIA', 'LEADER_HARUN_AL_RASHID'),
    new Civ5Def('CIVILIZATION_AZTEC', 'LEADER_MONTEZUMA'),
    new Civ5Def('CIVILIZATION_CHINA', 'LEADER_WU_ZETIAN'),
    new Civ5Def('CIVILIZATION_EGYPT', 'LEADER_RAMESSES'),
    new Civ5Def('CIVILIZATION_ENGLAND', 'LEADER_ELIZABETH'),
    new Civ5Def('CIVILIZATION_FRANCE', 'LEADER_NAPOLEON'),
    new Civ5Def('CIVILIZATION_GERMANY', 'LEADER_BISMARCK'),
    new Civ5Def('CIVILIZATION_GREECE', 'LEADER_ALEXANDER'),
    new Civ5Def('CIVILIZATION_INDIA', 'LEADER_GANDHI'),
    new Civ5Def('CIVILIZATION_IROQUOIS', 'LEADER_HIAWATHA'),
    new Civ5Def('CIVILIZATION_JAPAN', 'LEADER_ODA_NOBUNGA'),
    new Civ5Def('CIVILIZATION_OTTOMAN', 'LEADER_SULEIMAN'),
    new Civ5Def('CIVILIZATION_PERSIA', 'LEADER_DARIUS'),
    new Civ5Def('CIVILIZATION_ROME', 'LEADER_AUGUSTUS'),
    new Civ5Def('CIVILIZATION_RUSSIA', 'LEADER_CATHERINE'),
    new Civ5Def('CIVILIZATION_SIAM', 'LEADER_RAMKHAMHAENG'),
    new Civ5Def('CIVILIZATION_SONGHAI', 'LEADER_ASKIA'),
];

export const CIV5_GAME_SPEEDS = new Array<GameSpeed>(
    new GameSpeed('GAMESPEED_QUICK', 'Quick'),
    new GameSpeed('GAMESPEED_STANDARD', 'Standard'),
    new GameSpeed('GAMESPEED_EPIC', 'Epic'),
    new GameSpeed('GAMESPEED_MARATHON', 'Marathon')
);

export const CIV5_MAP_SIZES = new Array<MapSize>(
    new MapSize('WORLDSIZE_DUEL', 'Duel', 2),
    new MapSize('WORLDSIZE_TINY', 'Tiny', 4),
    new MapSize('WORLDSIZE_SMALL', 'Small', 6),
    new MapSize('WORLDSIZE_STANDARD', 'Standard', 8),
    new MapSize('WORLDSIZE_LARGE', 'Large', 10),
    new MapSize('WORLDSIZE_HUGE', 'Huge', 12)
);

export const CIV5_MAPS = new Array<Map>(
    new Map('Assets\\Maps\\Continents.lua', 'Continents'),
);

export const CIV5_GAME: CivGame = {
    id: 'CIV5',
    displayName: 'Civ 5',
    turnTimerSupported: true,
    assetPrefix: 'CIV5_',
    dlcs: CIV5_DLCS,
    gameSpeeds: CIV5_GAME_SPEEDS,
    leaders: CIV5_LEADERS,
    maps: CIV5_MAPS,
    mapSizes: CIV5_MAP_SIZES,
    saveDirectory: '/Sid Meier\'s Civilization 5/Saves/hotseat/',
    saveExtension: 'Civ5Save',
    steamRunUrl: 'steam://run/8930//\\dx11'
};
