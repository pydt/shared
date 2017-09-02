import { Inject, Injectable, OpaqueToken } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {
  ApiUrlProvider, ApiCredentialsProvider, SteamProfile, Game, JoinGameRequestBody, ChangeCivRequestBody,
  StartTurnSubmitResponse, UserGames, OpenGamesResponse, CreateGameRequestBody, EditGameRequestBody, User
} from './entity';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';

export let API_URL_PROVIDER_TOKEN = new OpaqueToken('ApiUrlProvider');
export let API_CREDENTIALS_PROVIDER_TOKEN = new OpaqueToken('ApiCredentialsProvider');

@Injectable()
export class ApiService {
  constructor (
    private http: Http,
    @Inject(API_URL_PROVIDER_TOKEN) private aup: ApiUrlProvider,
    @Inject(API_CREDENTIALS_PROVIDER_TOKEN) private credentials: ApiCredentialsProvider
  ) {}

  getPublicJson(url: string): Observable<any> {
    return this.http.get(url)
      .map(res => {
        return res.json();
      });
  }

  getLoginUrl(): Observable<string> {
    return this.get(this.aup.url + '/auth/steam', true).map(data => {
      return data.redirectURL;
    });
  }

  setToken(token: string): Observable<void> {
    return Observable.fromPromise(this.credentials.store(token, null))
      .mergeMap(() => {
        return this.get(this.aup.url + '/user/steamProfile') as Observable<SteamProfile>;
      })
      .mergeMap(profile => {
        return Observable.fromPromise(this.credentials.store(token, profile));
      });
  }

  validateSteamCredentials(queryString: string): Observable<void> {
    return this.get(this.aup.url + '/auth/steam/validate' + queryString, true).flatMap(data => {
      if (data.token) {
        return Observable.fromPromise(this.credentials.store(data.token, data.steamProfile));
      }

      throw data;
    });
  }

  getGame(id: string): Observable<Game> {
    return this.get(this.aup.url + '/game/' + id, true);
  }

  joinGame(data: JoinGameRequestBody): Observable<Game> {
    return this.post(this.aup.url + '/game/' + data.gameId + '/join', data);
  }

  leaveGame(gameId: string): Observable<Game> {
    return this.post(this.aup.url + '/game/' + gameId + '/leave', {});
  }

  changeCiv(data: ChangeCivRequestBody): Observable<Game> {
    return this.post(this.aup.url + '/game/' + data.gameId + '/changeCiv', data);
  }

  startGame(id: string): Observable<Game> {
    return this.post(this.aup.url + '/game/' + id + '/start', {});
  }

  getTurnUrl(gameId: string, compressed = false): Observable<string> {
    let url = this.aup.url + '/game/' + gameId + '/turn';

    if (compressed) {
      url += '?compressed=true';
    }

    return this.get(url).map(data => {
      return data.downloadUrl;
    });
  }

  revertTurn(gameId: string): Observable<Game> {
    return this.post(this.aup.url + '/game/' + gameId + '/turn/revert', {});
  }

  kickUser(gameId: string, userId: string): Observable<Game> {
    return this.post(this.aup.url + '/game/' + gameId + '/surrender', {
      kickUserId: userId
    });
  }

  surrender(gameId: string): Observable<Game> {
    return this.post(this.aup.url + '/game/' + gameId + '/surrender', {});
  }

  startTurnSubmit(gameId: string): Observable<StartTurnSubmitResponse> {
    return this.post(this.aup.url + '/game/' + gameId + '/turn/startSubmit', {});
  }

  finishTurnSubmit(gameId: string): Observable<Game> {
    return this.post(this.aup.url + '/game/' + gameId + '/turn/finishSubmit', {});
  }

  getUserGames(): Observable<UserGames> {
    return this.get(this.aup.url + '/user/games');
  }

  listOpenGames(): Observable<OpenGamesResponse> {
    return this.get(this.aup.url + '/game/listOpen', true);
  }

  createGame(data: CreateGameRequestBody): Observable<Game> {
    return this.post(this.aup.url + '/game/create', data);
  }

  deleteGame(gameId: string): Observable<void> {
    return this.post(this.aup.url + '/game/' + gameId + '/delete', {});
  }

  editGame(data: EditGameRequestBody): Observable<Game> {
    return this.post(this.aup.url + '/game/' + data.gameId + '/edit', data);
  }

  getUser(): Observable<User> {
    return this.get(this.aup.url + '/user/getCurrent');
  }

  getUsers(): Observable<User[]> {
    return this.get(this.aup.url + '/users', true);
  }

  getUserById(userId: string): Observable<User> {
    return this.get(this.aup.url + '/user/' + userId, true);
  }

  setNotificationEmailAddress(emailAddress: string): Observable<User> {
    return this.post(this.aup.url + '/user/setNotificationEmail', {'emailAddress': emailAddress});
  }

  getSteamProfiles(steamIds: string[]): Observable<SteamProfile[]> {
    return this.get(this.aup.url + '/user/steamProfiles?steamIds=' + steamIds.join(), true);
  }

  getSteamProfile(): Observable<SteamProfile> {
    return Observable.fromPromise(this.credentials.getSteamProfile());
  }

  isLoggedIn(): Observable<boolean> {
    return this.getToken().map(token => {
      return !!token;
    });
  }

  getToken(): Observable<string> {
    return Observable.fromPromise(this.credentials.getToken());
  }

  private getAuthHeaders(disableAuth?: boolean): Observable<Headers> {
    return this.getToken().map(token => {
      const headers = new Headers();

      if (!disableAuth) {
          if (!token) {
              throw new Error('Not Logged In!');
          }

          headers.append('Authorization', token);
      }

      return headers;
    });
  }

  private get(url: string, disableAuth?: boolean): Observable<any> {
    return this.getAuthHeaders(disableAuth).flatMap(headers => {
      return this.http.get(url, {
        headers: headers
      });
    }).map(res => {
      return res.json();
    });
  }

  private post(url: string, data: any): Observable<any> {
    return this.getAuthHeaders().flatMap(headers => {
      return this.http.post(url, data, {
        headers: headers
      });
    }).map(res => {
      return res.json();
    });
  }
}
