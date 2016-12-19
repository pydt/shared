import { Inject, Injectable, OpaqueToken } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export let API_URL_PROVIDER_TOKEN = new OpaqueToken('ApiUrlProvider');
export let API_CREDENTIALS_PROVIDER_TOKEN = new OpaqueToken('ApiCredentialsProvider');

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

export interface Game extends Entity {
  gameId: string;
  createdBySteamId: string;
  inProgress: boolean;
  displayName: string;
  description: string;
  dlc: string[];
  hashedPassword: string;
  slots: number;
  humans: number;
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

export interface User extends Entity {
  steamId: string;
  displayName: string;
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

export interface GameRequestBody {
  displayName: string;
  description: string;
  password: string;
  dlc: string[];
  slots: number;
  humans: number;
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

@Injectable()
export class ApiService {
  constructor (
    private http: Http,
    @Inject(API_URL_PROVIDER_TOKEN) private aup: ApiUrlProvider,
    @Inject(API_CREDENTIALS_PROVIDER_TOKEN) private credentials: ApiCredentialsProvider
  ) {}

  getPublicJson(url: string): Promise<any> {
    return this.http.get(url)
      .map(res => {
        return res.json();
      }).toPromise();
  }

  getLoginUrl(): Promise<string> {
    return this.get(this.aup.url + '/auth/steam', true).then(data => {
      return data.redirectURL;
    });
  }

  setToken(token: string): Promise<void> {
    return this.credentials.store(token, null)
      .then(() => {
        return this.get(this.aup.url + '/user/steamProfile') as Promise<SteamProfile>;
      })
      .then(profile => {
        return this.credentials.store(token, profile);
      });
  }

  validateSteamCredentials(queryString: string): Promise<void> {
    return this.get(this.aup.url + '/auth/steam/validate' + queryString, true).then(data => {
      if (data.token) {
        return this.credentials.store(data.token, data.steamProfile);
      }

      throw data;
    });
  }

  getGame(id: string): Promise<Game> {
    return this.get(this.aup.url + '/game/' + id, true);
  }

  joinGame(data: JoinGameRequestBody): Promise<Game> {
    return this.post(this.aup.url + '/game/' + data.gameId + '/join', data);
  }

  leaveGame(gameId: string): Promise<Game> {
    return this.post(this.aup.url + '/game/' + gameId + '/leave', {});
  }

  changeCiv(data: ChangeCivRequestBody): Promise<Game> {
    return this.post(this.aup.url + '/game/' + data.gameId + '/changeCiv', data);
  }

  startGame(id: string): Promise<Game> {
    return this.post(this.aup.url + '/game/' + id + '/start', {});
  }

  getTurnUrl(gameId: string): Promise<string> {
    return this.get(this.aup.url + '/game/' + gameId + '/turn').then(data => {
      return data.downloadUrl;
    });
  }

  revertTurn(gameId: string): Promise<Game> {
    return this.post(this.aup.url + '/game/' + gameId + '/turn/revert', {});
  }

  surrender(gameId: string): Promise<Game> {
    return this.post(this.aup.url + '/game/' + gameId + '/surrender', {});
  }

  startTurnSubmit(gameId: string): Promise<StartTurnSubmitResponse> {
    return this.post(this.aup.url + '/game/' + gameId + '/turn/startSubmit', {});
  }

  finishTurnSubmit(gameId: string): Promise<Game> {
    return this.post(this.aup.url + '/game/' + gameId + '/turn/finishSubmit', {});
  }

  getUserGames(): Promise<UserGames> {
    return this.get(this.aup.url + '/user/games');
  }

  listOpenGames(): Promise<Game[]> {
    return this.get(this.aup.url + '/game/listOpen', true);
  }

  createGame(data: CreateGameRequestBody): Promise<Game> {
    return this.post(this.aup.url + '/game/create', data);
  }

  deleteGame(gameId: string): Promise<void> {
    return this.post(this.aup.url + '/game/' + gameId + '/delete', {});
  }

  editGame(data: EditGameRequestBody): Promise<Game> {
    return this.post(this.aup.url + '/game/' + data.gameId + '/edit', data);
  }

  getUser(): Promise<User> {
    return this.get(this.aup.url + '/user');
  }

  getUsers(): Promise<User[]> {
    return this.get(this.aup.url + '/users', true);
  }

  getUserById(userId: string): Promise<User> {
    return this.get(this.aup.url + '/user/' + userId, true);
  }

  setNotificationEmailAddress(emailAddress: string): Promise<User> {
    return this.post(this.aup.url + '/user/setNotificationEmail', {'emailAddress': emailAddress});
  }

  getSteamProfiles(steamIds: string[]): Promise<SteamProfile[]> {
    return this.get(this.aup.url + '/user/steamProfiles?steamIds=' + steamIds.join(), true);
  }

  getSteamProfile(): Promise<SteamProfile> {
    return this.credentials.getSteamProfile();
  }

  isLoggedIn(): Promise<boolean> {
    return this.credentials.getToken().then(token => {
        return !!token;
    });
  }

  getToken(): Promise<string> {
    return this.credentials.getToken();
  }

  private getAuthHeaders(disableAuth?: boolean): Promise<Headers> {
    return this.credentials.getToken().then(token => {
      let headers = new Headers();

      if (!disableAuth) {
          if (!token) {
              throw new Error('Not Logged In!');
          }

          headers.append('Authorization', token);
      }

      return headers;
    });
  }

  private get(url: string, disableAuth?: boolean): Promise<any> {
    return this.getAuthHeaders(disableAuth).then(headers => {
      return this.http.get(url, {
        headers: headers
      }).map(res => {
        return res.json();
      }).toPromise();
    });
  }

  private post(url: string, data: any): Promise<any> {
    return this.getAuthHeaders().then(headers => {
      return this.http.post(url, data, {
        headers: headers
      }).map(res => {
        return res.json();
      }).toPromise();
    });
  }
}
