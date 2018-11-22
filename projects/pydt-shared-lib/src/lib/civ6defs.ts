import { BasePath, CivDef, CivGame, DLC, GameSpeed, Map, MapSize, Platform, RANDOM_CIV } from "./civdefs";

export const CIV6_DLCS: DLC[] = [
    new DLC('02A8BDDE-67EA-4D38-9540-26E685E3156E', 'Aztec Civilization Pack'),
    new DLC('3809975F-263F-40A2-A747-8BFB171D821A', 'Poland Civilization & Scenario Pack'),
    new DLC('2F6E858A-28EF-46B3-BEAC-B985E52E9BC1', 'Vikings Scenario Pack'),
    new DLC('E3F53C61-371C-440B-96CE-077D318B36C0', 'Australia Civilization & Scenario Pack'),
    new DLC('E2749E9A-8056-45CD-901B-C368C8E83DEB', 'Persia and Macedon Civilization & Scenario Pack'),
    new DLC('643EA320-8E1A-4CF1-A01C-00D88DDD131A', 'Nubia Civilization & Scenario Pack'),
    new DLC('1F367231-A040-4793-BDBB-088816853683', 'Khmer and Indonesia Civilization & Scenario Pack'),
    new DLC('1B28771A-C749-434B-9053-D1380C553DE9', 'Rise and Fall Expansion', true)
];

export const CIV6_LEADERS = [
    RANDOM_CIV,
    new CivDef('CIVILIZATION_MACEDON', 'LEADER_ALEXANDER', null, 'E2749E9A-8056-45CD-901B-C368C8E83DEB'),
    new CivDef('CIVILIZATION_NUBIA', 'LEADER_AMANITORE', null, '643EA320-8E1A-4CF1-A01C-00D88DDD131A'),
    new CivDef('CIVILIZATION_FRANCE', 'LEADER_CATHERINE_DE_MEDICI'),
    new CivDef('CIVILIZATION_INDIA', 'LEADER_CHANDRAGUPTA', null, '1B28771A-C749-434B-9053-D1380C553DE9'),
    new CivDef('CIVILIZATION_EGYPT', 'LEADER_CLEOPATRA'),
    new CivDef('CIVILIZATION_PERSIA', 'LEADER_CYRUS', null, 'E2749E9A-8056-45CD-901B-C368C8E83DEB'),
    new CivDef('CIVILIZATION_GERMANY', 'LEADER_BARBAROSSA', 'Frederick Barbarossa'),
    new CivDef('CIVILIZATION_INDIA', 'LEADER_GANDHI'),
    new CivDef('CIVILIZATION_MONGOLIA', 'LEADER_GENGHIS_KHAN', null, '1B28771A-C749-434B-9053-D1380C553DE9'),
    new CivDef('CIVILIZATION_SUMERIA', 'LEADER_GILGAMESH'),
    new CivDef('CIVILIZATION_INDONESIA', 'LEADER_GITARJA', null, '1F367231-A040-4793-BDBB-088816853683'),
    new CivDef('CIVILIZATION_GREECE', 'LEADER_GORGO'),
    new CivDef('CIVILIZATION_NORWAY', 'LEADER_HARDRADA', 'Harald Hardrada'),
    new CivDef('CIVILIZATION_JAPAN', 'LEADER_HOJO', 'Hojo Tokimune'),
    new CivDef('CIVILIZATION_POLAND', 'LEADER_JADWIGA', null, '3809975F-263F-40A2-A747-8BFB171D821A'),
    new CivDef('CIVILIZATION_KHMER', 'LEADER_JAYAVARMAN', null, '1F367231-A040-4793-BDBB-088816853683'),
    new CivDef('CIVILIZATION_AUSTRALIA', 'LEADER_JOHN_CURTIN', null, 'E3F53C61-371C-440B-96CE-077D318B36C0'),
    new CivDef('CIVILIZATION_MAPUCHE', 'LEADER_LAUTARO', null, '1B28771A-C749-434B-9053-D1380C553DE9'),
    new CivDef('CIVILIZATION_AZTEC', 'LEADER_MONTEZUMA', null, '02A8BDDE-67EA-4D38-9540-26E685E3156E'),
    new CivDef('CIVILIZATION_KONGO', 'LEADER_MVEMBA', 'Mvemba a Nzinga'),
    new CivDef('CIVILIZATION_BRAZIL', 'LEADER_PEDRO', 'Pedro II'),
    new CivDef('CIVILIZATION_GREECE', 'LEADER_PERICLES'),
    new CivDef('CIVILIZATION_RUSSIA', 'LEADER_PETER_GREAT', 'Peter the Great'),
    new CivDef('CIVILIZATION_SPAIN', 'LEADER_PHILIP_II', 'Philip II'),
    new CivDef('CIVILIZATION_CREE', 'LEADER_POUNDMAKER', null, '1B28771A-C749-434B-9053-D1380C553DE9'),
    new CivDef('CIVILIZATION_CHINA', 'LEADER_QIN', 'Qin Shi Huang'),
    new CivDef('CIVILIZATION_SCOTLAND', 'LEADER_ROBERT_THE_BRUCE', null, '1B28771A-C749-434B-9053-D1380C553DE9'),
    new CivDef('CIVILIZATION_ARABIA', 'LEADER_SALADIN'),
    new CivDef('CIVILIZATION_KOREA', 'LEADER_SEONDEOK', null, '1B28771A-C749-434B-9053-D1380C553DE9'),
    new CivDef('CIVILIZATION_ZULU', 'LEADER_SHAKA', null, '1B28771A-C749-434B-9053-D1380C553DE9'),
    new CivDef('CIVILIZATION_GEORGIA', 'LEADER_TAMAR', null, '1B28771A-C749-434B-9053-D1380C553DE9'),
    new CivDef('CIVILIZATION_AMERICA', 'LEADER_T_ROOSEVELT', 'Teddy Roosevelt'),
    new CivDef('CIVILIZATION_SCYTHIA', 'LEADER_TOMYRIS'),
    new CivDef('CIVILIZATION_ROME', 'LEADER_TRAJAN'),
    new CivDef('CIVILIZATION_NETHERLANDS', 'LEADER_WILHELMINA', null, '1B28771A-C749-434B-9053-D1380C553DE9'),
    new CivDef('CIVILIZATION_ENGLAND', 'LEADER_VICTORIA'),
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
    saveDirectory: '/Sid Meier\'s Civilization VI/Saves/Hotseat/',
    saveExtension: 'Civ6Save',
    steamRunUrl: 'steam://run/289070'
};
