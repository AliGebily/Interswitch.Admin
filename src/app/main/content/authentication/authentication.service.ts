import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpClientService } from '../../../../@fuse/services/http-client.service';
import { GlobalService } from '../../../../@fuse/services/global.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from 'environments/environment';
import { LookupsService } from '../lookups/lookups.service';

@Injectable()
export class AuthenticationService {
  onAuthenticationChanged: BehaviorSubject<any> = new BehaviorSubject(
    undefined
  );
  constructor(
    private httpClientService: HttpClientService,
    private globalService: GlobalService,
    private lookupsService: LookupsService
  ) {}

  login(username, password, rememberMe): Promise<any> {
    var headers = new HttpHeaders();
    headers = headers.append(
      'Authorization',
      'Basic ' + window.btoa(username + ':' + password)
    );
    return new Promise((resolve, reject) => {
      this.httpClientService
        .post('admin/login', null, headers)
        .subscribe((response: any) => {
          this.lookupsService.setTeams(
            response.rankingsFilters.filter(f => f.filterType == 0)
          );
          this.lookupsService.setRegions(
            response.rankingsFilters.filter(f => f.filterType == 1)
          );
          this.globalService.setAuthInfo(
            {
              token: response.token,
              user: { name: username }
            },
            rememberMe
          );
          resolve(response);
        }, reject);
    });
  }
}
