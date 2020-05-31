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

@Injectable()
export class LookupsService implements Resolve<any> {
  users: any;
  regions: any[];
  teams: any[];
  medals: any[];
  constructor(private httpClientService: HttpClientService) {}

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
      Promise.all([
        this.getAllUsers(),
        this.getRegions(),
        this.getTeams(),
        this.getMedals()
      ]).then(() => {
        resolve();
      }, reject);
    });
  }

  getAllUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.users != null) {
        resolve(this.users);
      } else {
        this.httpClientService
          .post('admin/users/all', null)
          .subscribe((response: any) => {
            this.users = response;
            resolve(response);
          }, reject);
      }
    });
  }

  setRegions(regions) {
    localStorage.setItem('regions', JSON.stringify(regions));
    this.regions = regions;
  }
  getRegions(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.regions == null) {
        var regions: any = localStorage.getItem('regions');
        if (regions == null) {
          regions = [];
        } else {
          this.regions = JSON.parse(regions);
        }
      }
      resolve(this.regions);
    });
  }
  setTeams(teams) {
    localStorage.setItem('teams', JSON.stringify(teams));
    this.teams = teams;
  }
  getTeams(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.teams == null) {
        var teams: any = localStorage.getItem('teams');
        if (teams == null) {
          teams = [];
        } else {
          this.teams = JSON.parse(teams);
        }
      }
      resolve(this.teams);
    });
  }
  getMedals(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.medals != null) {
        resolve(this.medals);
      } else {
        this.httpClientService
          .post('medals/get', null)
          .subscribe((response: any) => {
            this.medals = response;
            resolve(response);
          }, reject);
      }
    });
  }
}
