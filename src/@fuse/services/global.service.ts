import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {
  NavigationStart,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { HttpClientService } from './http-client.service';
import { Subject } from 'rxjs/Subject';

const storageAuthInfoKey = 'interswitch_admin_auth_info';

@Injectable()
export class GlobalService {
  private _authInfo = null;

  onAuthenticationInfoChanged: BehaviorSubject<any> = new BehaviorSubject(
    undefined
  );
  onLoginScreen: BehaviorSubject<boolean> = new BehaviorSubject(false);
  onImagePreview: Subject<any> = new Subject<any>();

  constructor(
    private httpClientService: HttpClientService,
    private router: Router
  ) {
    this.getAuthInfo();
    this.httpClientService.authenticationToken = this.getToken();
    this.onAuthenticationInfoChanged.next(this.getAuthInfo());

    this.httpClientService.onUnAuthenticatedError.subscribe(data => {
      if (data === undefined) return;
      if (this.isLoggedIn()) {
        this.setAuthInfo({});
        this.router.navigate([environment.LOGIN_URL]);
      }
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (
          event.url.indexOf('errors/404') == -1 &&
          event.url.indexOf('auth/login') == -1 &&
          !this.isLoggedIn()
        ) {
          this.router.navigate([environment.LOGIN_URL]);
        }
      }
    });
  }

  isLoggedIn(): boolean {
    return this.getToken() != null;
  }

  getToken() {
    return this._authInfo != null ? this._authInfo.token : null;
  }
  getAuthInfo(): any {
    if (!this._authInfo) {
      let authInfo: any;
      try {
        authInfo = JSON.parse(localStorage.getItem(storageAuthInfoKey));
        if (!authInfo) {
          authInfo = JSON.parse(sessionStorage.getItem(storageAuthInfoKey));
        }
        if (!authInfo) {
          authInfo = {};
        }
      } catch (error) {
        authInfo = {};
      }
      this._authInfo = authInfo;
      // this._authInfo = {
      //   token: "faasdfsd",
      //   token_type: "afdfadsadf",
      //   user: { name: "Alig" }
      // };
    }
    return this._authInfo;
  }

  setAuthInfo(authInfo, rememberMe?: boolean) {
    localStorage.removeItem(storageAuthInfoKey);
    sessionStorage.removeItem(storageAuthInfoKey);

    if (rememberMe) {
      localStorage.setItem(storageAuthInfoKey, JSON.stringify(authInfo));
    } else {
      sessionStorage.setItem(storageAuthInfoKey, JSON.stringify(authInfo));
    }
    this._authInfo = authInfo;

    this.httpClientService.authenticationToken = this.getToken();

    this.onAuthenticationInfoChanged.next(this.getAuthInfo());
  }
  logout(): void {
    this.httpClientService
      .post('logout', null)
      .subscribe((response: Response) => {
        this.setAuthInfo({});
        this.router.navigate([environment.LOGIN_URL]);
      });
  }
}
