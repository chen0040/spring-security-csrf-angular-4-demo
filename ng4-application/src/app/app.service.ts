import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers,  Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import {ISpringUser} from "./spring-user";
import {IAuthenticationResult} from "./authentication-result";

@Injectable()
export class AppService {
  account: ISpringUser = null;
  username: string;
  _csrf: string;
  _sessionId: string;


  constructor(private _http: Http) {

  }

  authenticate(username: string, password: string): Observable<IAuthenticationResult> {
    let loginObj = {
      username: username,
      password: password
    };
    return this._http.post('./login', loginObj)
      .map((response: Response) => <IAuthenticationResult> response.json())
      .do( data => {
          if(data.authenticated) {
            this._sessionId = data.sessionId;
            this._csrf = data._csrf;
            this.username = username;
          }
          console.log("Authentication: " + JSON.stringify(data));
      })
      .catch(this.handleError);
  }

  getAccount(): Observable<ISpringUser> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('_csrf', this._csrf);
    headers.append('JSESSIONID', this._sessionId);

    const options = new RequestOptions({'headers': headers});
    return this._http.get(
      "account",
      options
    ).map((response: Response) => <ISpringUser> response.json())
      .do( data => {
        this.account = data;
        console.log("Account: " + JSON.stringify(data));
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }




}
