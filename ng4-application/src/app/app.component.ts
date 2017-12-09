import {Component, OnInit} from '@angular/core';
import { AppService } from './app.service';
import {IAuthenticationResult} from './authentication-result';
import {ISpringUser} from "./spring-user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Spring Security Demo with Angular 4';
  errorMessage = '';
  account: ISpringUser;
  authenticationResult: IAuthenticationResult;

  constructor(private _appService: AppService) {

  }


  ngOnInit(): void {
    this._appService.authenticate("admin", "admin").subscribe(authentionResult => {
      this.authenticationResult = authentionResult;
      this._appService.getAccount().subscribe(account => {
        this.account = account;
      }, error => this.errorMessage = <any>error);
    },
    error => this.errorMessage = <any>error);
  }




}
