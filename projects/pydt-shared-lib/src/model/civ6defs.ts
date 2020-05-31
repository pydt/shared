import { BasePath, CivDef, CivGame, DLC, GameSpeed, Map, MapSize, Platform, RANDOM_CIV, GameStore } from './civdefs';

export const CIV6_DLCS: DLC[] = [
    new DLC('02A8BDDE-67EA-4D38-9540-26E685E3156E', 'Aztec Civilization Pack'),
    new DLC('3809975F-263F-40A2-A747-8BFB171D821A', 'Poland Civilization & Scenario Pack'),
    new DLC('2F6E858A-28EF-46B3-BEAC-B985E52E9BC1', 'Vikings Scenario Pack'),
    new DLC('E3F53C61-371C-440B-96CE-077D318B36C0', 'Australia Civilization & Scenario Pack'),
    new DLC('E2749E9A-8056-45CD-901B-C368C8E83DEB', 'Persia and Macedon Civilization & Scenario Pack'),
    new DLC('643EA320-8E1A-4CF1-A01C-00D88DDD131A', 'Nubia Civilization & Scenario Pack'),
    new DLC('1F367231-A040-4793-BDBB-088816853683', 'Khmer and Indonesia Civilization & Scenario Pack'),
    new DLC('9DE86512-DE1A-400D-8C0A-AB46EBBF76B9', 'Maya and Gran Colombia Pack'),
    new DLC('1B28771A-C749-434B-9053-D1380C553DE9', 'Rise and Fall Expansion', true),
    new DLC('4873eb62-8ccc-4574-b784-dda455e74e68', 'Gathering Storm Expansion', true),
];

export const CIV6_LEADERS = [
    RANDOM_CIV,
    new CivDef('CIVILIZATION_MACEDON', 'LEADER_ALEXANDER', {
        dlcId: 'E2749E9A-8056-45CD-901B-C368C8E83DEB'
    }),
    new CivDef('CIVILIZATION_NUBIA', 'LEADER_AMANITORE', {
        dlcId: '643EA320-8E1A-4CF1-A01C-00D88DDD131A'
    }),
    new CivDef('CIVILIZATION_FRANCE', 'LEADER_CATHERINE_DE_MEDICI'),
    new CivDef('CIVILIZATION_INDIA', 'LEADER_CHANDRAGUPTA', {
        dlcId: '1B28771A-C749-434B-9053-D1380C553DE9'
    }),
    new CivDef('CIVILIZATION_EGYPT', 'LEADER_CLEOPATRA'),
    new CivDef('CIVILIZATION_PERSIA', 'LEADER_CYRUS', {
        dlcId: 'E2749E9A-8056-45CD-901B-C368C8E83DEB'
    }),
    new CivDef('CIVILIZATION_GERMANY', 'LEADER_BARBAROSSA', {
        leaderDisplayName: 'Frederick Barbarossa'
    }),
    new CivDef('CIVILIZATION_PHOENICIA', 'LEADER_DIDO', {
        dlcId: '4873eb62-8ccc-4574-b784-dda455e74e68'
    }),
    new CivDef('CIVILIZATION_ENGLAND', 'LEADER_ELEANOR_ENGLAND', {
        dlcId: '4873eb62-8ccc-4574-b784-dda455e74e68',
        leaderDisplayName: 'Eleanor of Aquitaine'
    }),
    new CivDef('CIVILIZATION_FRANCE', 'LEADER_ELEANOR_FRANCE', {
        dlcId: '4873eb62-8ccc-4574-b784-dda455e74e68',
        leaderDisplayName: 'Eleanor of Aquitaine'
    }),
    new CivDef('CIVILIZATION_INDIA', 'LEADER_GANDHI'),
    new CivDef('CIVILIZATION_MONGOLIA', 'LEADER_GENGHIS_KHAN', {
        dlcId: '1B28771A-C749-434B-9053-D1380C553DE9'
    }),
    new CivDef('CIVILIZATION_SUMERIA', 'LEADER_GILGAMESH'),
    new CivDef('CIVILIZATION_INDONESIA', 'LEADER_GITARJA', {
        dlcId: '1F367231-A040-4793-BDBB-088816853683'
    }),
    new CivDef('CIVILIZATION_GREECE', 'LEADER_GORGO'),
    new CivDef('CIVILIZATION_NORWAY', 'LEADER_HARDRADA', {
        leaderDisplayName: 'Harald Hardrada'
    }),
    new CivDef('CIVILIZATION_JAPAN', 'LEADER_HOJO', {
        leaderDisplayName: 'Hojo Tokimune'
    }),
    new CivDef('CIVILIZATION_POLAND', 'LEADER_JADWIGA', {
        dlcId: '3809975F-263F-40A2-A747-8BFB171D821A'
    }),
    new CivDef('CIVILIZATION_KHMER', 'LEADER_JAYAVARMAN', {
        dlcId: '1F367231-A040-4793-BDBB-088816853683'
    }),
    new CivDef('CIVILIZATION_AUSTRALIA', 'LEADER_JOHN_CURTIN', {
        dlcId: 'E3F53C61-371C-440B-96CE-077D318B36C0'
    }),
    new CivDef('CIVILIZATION_SWEDEN', 'LEADER_KRISTINA', {
        dlcId: '4873eb62-8ccc-4574-b784-dda455e74e68'
    }),
    new CivDef('CIVILIZATION_MAORI', 'LEADER_KUPE', {
        dlcId: '4873eb62-8ccc-4574-b784-dda455e74e68'
    }),
    new CivDef('CIVILIZATION_MAYA', 'LEADER_LADY_SIX_SKY', {
        dlcId: '9DE86512-DE1A-400D-8C0A-AB46EBBF76B9'
    }),
    new CivDef('CIVILIZATION_MAPUCHE', 'LEADER_LAUTARO', {
        dlcId: '1B28771A-C749-434B-9053-D1380C553DE9'
    }),
    new CivDef('CIVILIZATION_MALI', 'LEADER_MANSA_MUSA', {
        dlcId: '4873eb62-8ccc-4574-b784-dda455e74e68'
    }),
    new CivDef('CIVILIZATION_HUNGARY', 'LEADER_MATTHIAS_CORVINUS', {
        dlcId: '4873eb62-8ccc-4574-b784-dda455e74e68'
    }),
    new CivDef('CIVILIZATION_AZTEC', 'LEADER_MONTEZUMA', {
        dlcId: '02A8BDDE-67EA-4D38-9540-26E685E3156E'
    }),
    new CivDef('CIVILIZATION_KONGO', 'LEADER_MVEMBA', {
        leaderDisplayName: 'Mvemba a Nzinga'
    }),
    new CivDef('CIVILIZATION_INCA', 'LEADER_PACHACUTI', {
        dlcId: '4873eb62-8ccc-4574-b784-dda455e74e68'
    }),
    new CivDef('CIVILIZATION_BRAZIL', 'LEADER_PEDRO', {
        leaderDisplayName: 'Pedro II'
    }),
    new CivDef('CIVILIZATION_GREECE', 'LEADER_PERICLES'),
    new CivDef('CIVILIZATION_RUSSIA', 'LEADER_PETER_GREAT', {
        leaderDisplayName: 'Peter the Great'
    }),
    new CivDef('CIVILIZATION_SPAIN', 'LEADER_PHILIP_II', {
        leaderDisplayName: 'Philip II'
    }),
    new CivDef('CIVILIZATION_CREE', 'LEADER_POUNDMAKER', {
        dlcId: '1B28771A-C749-434B-9053-D1380C553DE9'
    }),
    new CivDef('CIVILIZATION_CHINA', 'LEADER_QIN', {
        leaderDisplayName: 'Qin Shi Huang'
    }),
    new CivDef('CIVILIZATION_SCOTLAND', 'LEADER_ROBERT_THE_BRUCE', {
        dlcId: '1B28771A-C749-434B-9053-D1380C553DE9'
    }),
    new CivDef('CIVILIZATION_ARABIA', 'LEADER_SALADIN'),
    new CivDef('CIVILIZATION_KOREA', 'LEADER_SEONDEOK', {
        dlcId: '1B28771A-C749-434B-9053-D1380C553DE9'
    }),
    new CivDef('CIVILIZATION_ZULU', 'LEADER_SHAKA', {
        dlcId: '1B28771A-C749-434B-9053-D1380C553DE9'
    }),
    new CivDef('CIVILIZATION_GRAN_COLOMBIA', 'LEADER_SIMON_BOLIVAR', {
        dlcId: '9DE86512-DE1A-400D-8C0A-AB46EBBF76B9'
    }),
    new CivDef('CIVILIZATION_OTTOMAN', 'LEADER_SULEIMAN', {
        dlcId: '4873eb62-8ccc-4574-b784-dda455e74e68'
    }),
    new CivDef('CIVILIZATION_GEORGIA', 'LEADER_TAMAR', {
        dlcId: '1B28771A-C749-434B-9053-D1380C553DE9'
    }),
    new CivDef('CIVILIZATION_AMERICA', 'LEADER_T_ROOSEVELT', {
        leaderDisplayName: 'Teddy Roosevelt'
    }),
    new CivDef('CIVILIZATION_SCYTHIA', 'LEADER_TOMYRIS'),
    new CivDef('CIVILIZATION_ROME', 'LEADER_TRAJAN'),
    new CivDef('CIVILIZATION_CANADA', 'LEADER_LAURIER', {
        dlcId: '4873eb62-8ccc-4574-b784-dda455e74e68',
        leaderDisplayName: 'Wilfrid Laurier'
    }),
    new CivDef('CIVILIZATION_NETHERLANDS', 'LEADER_WILHELMINA', {
        dlcId: '1B28771A-C749-434B-9053-D1380C553DE9'
    }),
    new CivDef('CIVILIZATION_ENGLAND', 'LEADER_VICTORIA')
];

export const CIV6_GAME_SPEEDS = new Array<GameSpeed>(
    new GameSpeed('GAMESPEED_ONLINE', 'Online'),
    new GameSpeed('GAMESPEED_QUICK', 'Quick'),
    new GameSpeed('GAMESPEED_STANDARD', 'Standard'),
    new GameSpeed('GAMESPEED_EPIC', 'Epic'),
    new GameSpeed('GAMESPEED_MARATHON', 'Marathon')
);

export const CIV6_MAP_SIZES = new Array<MapSize>(
    new MapSize('MAPSIZE_DUEL', 'Duel', 2),
    new MapSize('MAPSIZE_TINY', 'Tiny', 4),
    new MapSize('MAPSIZE_SMALL', 'Small', 6),
    new MapSize('MAPSIZE_STANDARD', 'Standard', 8),
    new MapSize('MAPSIZE_LARGE', 'Large', 10),
    new MapSize('MAPSIZE_HUGE', 'Huge', 12)
);

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

export const CIV6_GAME: CivGame = {
    id: 'CIV6',
    displayName: 'Civilization 6',
    turnTimerSupported: false,
    assetPrefix: '',
    dlcs: CIV6_DLCS,
    gameSpeeds: CIV6_GAME_SPEEDS,
    leaders: CIV6_LEADERS,
    maps: CIV6_MAPS,
    mapSizes: CIV6_MAP_SIZES,
    saveLocations: {
        [Platform.Windows]: { basePath: BasePath.DOCUMENTS, prefix: '/My Games' },
        [Platform.OSX]: { basePath: BasePath.APP_DATA, prefix: '' },
        [Platform.Linux]: { basePath: BasePath.HOME, prefix: '/.local/share/aspyr-media' }
    },
    dataPaths: {
        [GameStore.Steam]: '/Sid Meier\'s Civilization VI',
        [GameStore.Epic]: '/Sid Meier\'s Civilization VI (Epic)'
    },
    savePath: '/Saves/Hotseat/',
    saveExtension: 'Civ6Save',
    runUrls: {
        [GameStore.Steam]: 'steam://run/289070/\\dx11',
        [GameStore.Epic]: 'com.epicgames.launcher://apps/Kinglet?action=launch&silent=true'
    }
};
