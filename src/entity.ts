export interface Entity {
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface SteamProfile {
    steamid: string;
    personaname: string;
    profileurl: string;
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
}

export interface GamePlayer {
  steamId: string;
  civType: string;
  hasSurrendered?: boolean;
  turnsPlayed: number;
  turnsSkipped: number;
  timeTaken: number;
  fastTurns: number;
  slowTurns: number;
}

export interface BaseGame {
  displayName: string;
  description: string;
  dlc: string[];
  slots: number;
  humans: number;
  gameSpeed: string;
  mapFile: string;
  mapSize: string;
  allowJoinAfterStart: boolean;
}

export interface Game extends Entity, BaseGame {
  gameId: string;
  createdBySteamId: string;
  inProgress: boolean;
  hashedPassword: string;
  players: GamePlayer[];
  discourseTopicId: number;
  currentPlayerSteamId: string;
  turnTimerMinutes: number;
  round: number;
  gameTurnRangeKey: number;
}

export interface UserGames {
  data: Game[];
  pollUrl: string;
}

export interface OpenGamesResponse {
  notStarted: Game[];
  openSlots: Game[];
}

export interface User extends Entity {
  steamId: string;
  displayName: string;
  avatarSmall: string;
  avatarMedium: string;
  avatarFull: string;
  emailAddress: string;
  activeGameIds: string[];
  inactiveGameIds: string[];
  turnsPlayed: number;
  turnsSkipped: number;
  timeTaken: number;
  fastTurns: number;
  slowTurns: number;
}

export interface StartTurnSubmitResponse {
  putUrl: string;
}

export interface ApiUrlProvider {
    url: string;
}

export interface ApiCredentialsProvider {
    store(token: string, profile: SteamProfile): Promise<void>;
    getToken(): Promise<string>;
    getSteamProfile(): Promise<SteamProfile>;
}

export interface GameRequestBody extends BaseGame {
  password: string;
}

export interface EditGameRequestBody extends GameRequestBody {
  gameId: string;
}

export interface CreateGameRequestBody extends GameRequestBody {
  player1Civ: string;
}

export interface ChangeCivRequestBody {
  gameId: string;
  playerCiv: string;
}

export interface JoinGameRequestBody extends ChangeCivRequestBody {
  password: string;
}
