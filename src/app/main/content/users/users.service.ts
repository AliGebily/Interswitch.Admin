import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../../../@fuse/services/http-client.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from 'environments/environment';
import { LookupsService } from '../lookups/lookups.service';
import { EnumConstants } from '../../../../@fuse/services/enum.constants';
import { UtilService } from '@fuse/services/util.service';

@Injectable()
export class UsersService implements Resolve<any> {
  userAwardedMedalsSearchResult: any;
  usersSearchResult: any;
  currentUserAwardedMedal: any;
  constructor(
    private httpClientService: HttpClientService,
    private lookupsService: LookupsService,
    private utilService: UtilService
  ) {}

  /**
   * Resolve
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      let userAwardedMedalId: any = route.paramMap.get('userAwardedMedalId');
      let userId: any = route.paramMap.get('userId');
      if (userAwardedMedalId) {
        Promise.all([this.getUserAwardedMedal(userAwardedMedalId)]).then(() => {
          resolve();
        }, reject);
      } else if (
        route.url.findIndex(p => p.path == 'user-awarded-medals') > -1
      ) {
        Promise.all([
          this.lookupsService.getAllUsers(),
          this.lookupsService.getMedals(),
          this.getUserAwardedMedals(null)
        ]).then(() => {
          resolve();
        }, reject);
      } else if (route.url.findIndex(p => p.path == 'users') > -1) {
        Promise.all([
          this.lookupsService.getRegions(),
          this.lookupsService.getTeams(),
          this.getUsers(null)
        ]).then(() => {
          resolve();
        }, reject);
      } else {
        throw new Error(`${route.url} url is not handled`);
      }
    });
  }
  getUserAwardedMedals(criteria: any): Promise<any> {
    criteria = this.utilService.setPagination(criteria);
    return new Promise((resolve, reject) => {
      this.httpClientService
        .post('admin/users/awardedMedals', criteria)
        .subscribe((response: any) => {
          this.userAwardedMedalsSearchResult = response;
          resolve(response);
        }, reject);
    });
  }

  public awardMedals(userAwardedMedals: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClientService
        .post(`admin/users/award`, userAwardedMedals)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
  public deleteUserAwardedMedal(userAwardedMedalId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClientService
        .post(`admin/userAwardedMedals/delete`, { id: userAwardedMedalId })
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
  getUserAwardedMedal(userAwardedMedalId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClientService
        .post(`admin/userAwardedMedal/${userAwardedMedalId}`, null)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  getUsers(criteria: any): Promise<any> {
    criteria = this.utilService.setPagination(criteria);
    return new Promise((resolve, reject) => {
      this.httpClientService
        .post('admin/users', criteria)
        .subscribe((response: any) => {
          this.usersSearchResult = response;
          resolve(response);
        }, reject);
    });
  }

  public activateUser(userId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClientService
        .post(`admin/user/activate`, { id: userId })
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  public suspendUser(userId): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClientService
        .post(`admin/user/suspend`, { id: userId })
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
}
