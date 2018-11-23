import { BasePath, CivDef, CivGame, DLC, GameSpeed, Map, MapSize, Platform, RANDOM_CIV } from "./civdefs";

class Civ5Def extends CivDef {
    getImageFileName() {
        return `CIV5_${this.civKey.replace('CIVILIZATION_', '')}_${this.leaderKey.replace('LEADER_', '')}.png`;
    }
}

export const CIV5_DLCS: DLC[] = [
    new DLC('e31e3c297611f644ac1f59663826de74', 'Mongolia'),
    new DLC('ded585b6ca7c754e81b42f60754e6330', 'Spain and Inca'),
    new DLC('05c6f7ec11baac4c8d80d71306aac471', 'Polynesia'),
    new DLC('390d03b3d8c0c74b91b17ad1caf585ab', 'Denmark'),
    new DLC('b2222c110853b642b734171ccab3037b', 'Korea'),
    new DLC('32ba59746457ae448e9501ad0e0efd48', 'Babylon'),
    new DLC('a151370e40f81b4e9706519bf484e59d', 'Expansion - Gods and Kings', true),
    new DLC('3676a06d23411840b6436575b4ec336b', 'Expansion - Brave New World', true)
];

export const CIV5_LEADERS = [
    RANDOM_CIV,
    new Civ5Def('CIVILIZATION_AMERICA', 'LEADER_WASHINGTON'),
    new Civ5Def('CIVILIZATION_ARABIA', 'LEADER_HARUN_AL_RASHID', { leaderDisplayName: 'Harun al-Rashid' }),
    new Civ5Def('CIVILIZATION_ASSYRIA', 'LEADER_ASHURBANIPAL', { dlcId: '3676a06d23411840b6436575b4ec336b' }),
    new Civ5Def('CIVILIZATION_AUSTRIA', 'LEADER_MARIA', { leaderDisplayName: 'Maria Theresa', dlcId: 'a151370e40f81b4e9706519bf484e59d' }),
    new Civ5Def('CIVILIZATION_AZTEC', 'LEADER_MONTEZUMA'),
    new Civ5Def('CIVILIZATION_BABYLON', 'LEADER_NEBUCHADNEZZAR', { leaderDisplayName: 'Nebuchadnezzar II', dlcId: '32ba59746457ae448e9501ad0e0efd48' }),
    new Civ5Def('CIVILIZATION_BRAZIL', 'LEADER_PEDRO', { leaderDisplayName: 'Pedro II', dlcId: '3676a06d23411840b6436575b4ec336b' }),
    new Civ5Def('CIVILIZATION_BYZANTIUM', 'LEADER_THEODORA', { dlcId: 'a151370e40f81b4e9706519bf484e59d' }),
    new Civ5Def('CIVILIZATION_CARTHAGE', 'LEADER_DIDO', { dlcId: 'a151370e40f81b4e9706519bf484e59d' }),
    new Civ5Def('CIVILIZATION_CELTS', 'LEADER_BOUDICCA', { dlcId: 'a151370e40f81b4e9706519bf484e59d' }),
    new Civ5Def('CIVILIZATION_CHINA', 'LEADER_WU_ZETIAN'),
    new Civ5Def('CIVILIZATION_DENMARK', 'LEADER_HARALD', { leaderDisplayName: 'Harald Bluetooth', dlcId: '390d03b3d8c0c74b91b17ad1caf585ab' }),
    new Civ5Def('CIVILIZATION_EGYPT', 'LEADER_RAMESSES', { leaderDisplayName: 'Ramesses II' }),
    new Civ5Def('CIVILIZATION_ENGLAND', 'LEADER_ELIZABETH'),
    new Civ5Def('CIVILIZATION_ETHIOPIA', 'LEADER_SELASSIE', { leaderDisplayName: 'Haile Selassie', dlcId: 'a151370e40f81b4e9706519bf484e59d' }),
    new Civ5Def('CIVILIZATION_FRANCE', 'LEADER_NAPOLEON'),
    new Civ5Def('CIVILIZATION_GERMANY', 'LEADER_BISMARCK'),
    new Civ5Def('CIVILIZATION_GREECE', 'LEADER_ALEXANDER'),
    new Civ5Def('CIVILIZATION_HUNS', 'LEADER_ATTILA', { dlcId: 'a151370e40f81b4e9706519bf484e59d' }),
    new Civ5Def('CIVILIZATION_INCA', 'LEADER_PACHACUTI', { dlcId: 'ded585b6ca7c754e81b42f60754e6330' }),
    new Civ5Def('CIVILIZATION_INDIA', 'LEADER_GANDHI'),
    new Civ5Def('CIVILIZATION_INDONESIA', 'LEADER_GAJAH_MADA', { dlcId: '3676a06d23411840b6436575b4ec336b' }),
    new Civ5Def('CIVILIZATION_IROQUOIS', 'LEADER_HIAWATHA'),
    new Civ5Def('CIVILIZATION_JAPAN', 'LEADER_ODA_NOBUNGA'),
    new Civ5Def('CIVILIZATION_KOREA', 'LEADER_SEJONG', { dlcId: 'b2222c110853b642b734171ccab3037b' }),
    new Civ5Def('CIVILIZATION_MAYA', 'LEADER_PACAL', { dlcId: 'a151370e40f81b4e9706519bf484e59d' }),
    new Civ5Def('CIVILIZATION_MONGOL', 'LEADER_GENGHIS_KHAN', { dlcId: 'e31e3c297611f644ac1f59663826de74' }),
    new Civ5Def('CIVILIZATION_MOROCCO', 'LEADER_AHMAD_ALMANSUR', { leaderDisplayName: 'Ahmad al-Mansur', dlcId: '3676a06d23411840b6436575b4ec336b' }),
    new Civ5Def('CIVILIZATION_NETHERLANDS', 'LEADER_WILLIAM', { dlcId: 'a151370e40f81b4e9706519bf484e59d' }),
    new Civ5Def('CIVILIZATION_OTTOMAN', 'LEADER_SULEIMAN'),
    new Civ5Def('CIVILIZATION_PERSIA', 'LEADER_DARIUS', { leaderDisplayName: 'Darius I' }),
    new Civ5Def('CIVILIZATION_POLAND', 'LEADER_CASIMIR', { leaderDisplayName: 'Casimir III', dlcId: '3676a06d23411840b6436575b4ec336b' }),
    new Civ5Def('CIVILIZATION_POLYNESIA', 'LEADER_KAMEHAMEHA', { dlcId: '05c6f7ec11baac4c8d80d71306aac471' }),
    new Civ5Def('CIVILIZATION_PORTUGAL', 'LEADER_MARIA_I', { dlcId: '3676a06d23411840b6436575b4ec336b' }),
    new Civ5Def('CIVILIZATION_ROME', 'LEADER_AUGUSTUS', { leaderDisplayName: 'Augustus Caesar' }),
    new Civ5Def('CIVILIZATION_RUSSIA', 'LEADER_CATHERINE'),
    new Civ5Def('CIVILIZATION_SHOSHONE', 'LEADER_POCATELLO', { dlcId: '3676a06d23411840b6436575b4ec336b' }),
    new Civ5Def('CIVILIZATION_SIAM', 'LEADER_RAMKHAMHAENG'),
    new Civ5Def('CIVILIZATION_SPAIN', 'LEADER_ISABELLA', { dlcId: 'ded585b6ca7c754e81b42f60754e6330' }),
    new Civ5Def('CIVILIZATION_SONGHAI', 'LEADER_ASKIA'),
    new Civ5Def('CIVILIZATION_SWEDEN', 'LEADER_GUSTAVUS_ADOLPHUS', { dlcId: 'a151370e40f81b4e9706519bf484e59d' }),
    new Civ5Def('CIVILIZATION_VENICE', 'LEADER_ENRICO_DANDOLO', { dlcId: '3676a06d23411840b6436575b4ec336b' }),
    new Civ5Def('CIVILIZATION_ZULU', 'LEADER_SHAKA', { dlcId: '3676a06d23411840b6436575b4ec336b' })
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
    displayName: 'Civilization 5',
    turnTimerSupported: true,
    assetPrefix: 'CIV5_',
    dlcs: CIV5_DLCS,
    gameSpeeds: CIV5_GAME_SPEEDS,
    leaders: CIV5_LEADERS,
    maps: CIV5_MAPS,
    mapSizes: CIV5_MAP_SIZES,
    saveLocations: {
        [Platform.Windows]: { basePath: BasePath.DOCUMENTS, prefix: '/My Games' },
        [Platform.OSX]: { basePath: BasePath.DOCUMENTS, prefix: '/Aspyr' },
        [Platform.Linux]: { basePath: BasePath.HOME, prefix: '/.local/share/Aspyr' }
    },
    saveDirectory: '/Sid Meier\'s Civilization 5/Saves/hotseat/',
    saveExtension: 'Civ5Save',
    steamRunUrl: 'steam://run/8930/\\dx11'
};
