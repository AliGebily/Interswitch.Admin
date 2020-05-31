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
export class MessagesService implements Resolve<any> {
  messagesSearchResult: any;
  currentMessage: any;
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
      let messageId: any = route.paramMap.get('id');
      if (messageId) {
        Promise.all([this.getMessage(messageId)]).then(() => {
          resolve();
        }, reject);
      } else {
        let promises: Promise<any>[] = [
          this.lookupsService.getAllUsers(),
          this.lookupsService.getRegions(),
          this.lookupsService.getTeams()
        ];
        let url = route.url;

        if (url.findIndex(p => p.path == 'inbox') > -1) {
          promises.push(this.getInboxMessages(null));
        } else if (url.findIndex(p => p.path == 'sent') > -1) {
          promises.push(this.getSentMessages(null));
        } else if (url.findIndex(p => p.path == 'app') > -1) {
          promises.push(this.getAppMessages(null));
        } else {
          throw new Error(`${url} url is not handled`);
        }
        Promise.all(promises).then(() => {
          resolve();
        }, reject);
      }
    });
  }
  getInboxMessages(criteria: any): Promise<any> {
    criteria = this.utilService.setPagination(criteria);
    criteria.notificationsType = 'INBOX';
    return this.getMessages('admin/notifications/get', criteria);
  }

  getSentMessages(criteria: any): Promise<any> {
    criteria = this.utilService.setPagination(criteria);
    criteria.notificationsType = 'SENT';
    return this.getMessages('admin/notifications/get', criteria);
  }
  getAppMessages(criteria: any): Promise<any> {
    criteria = this.utilService.setPagination(criteria);
    return this.getMessages('admin/notifications/sent/get', criteria);
  }
  private getMessages(url: string, criteria: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClientService.post(url, criteria).subscribe((response: any) => {
        this.messagesSearchResult = response;
        resolve(response);
      }, reject);
    });
  }
  public getMessage(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClientService
        .post(`admin/notifications/${id}/get`, null)
        .subscribe((response: any) => {
          this.currentMessage = response;
          resolve(response);
        }, reject);
    });
  }
  public readMessage(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClientService
        .post(`admin/notification/read`, { id: id })
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
  public deleteMessage(id: any, notificationsType: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClientService
        .post(`admin/notifications/delete`, {
          id: id,
          notificationsType: notificationsType
        })
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
  public deliverMessage(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClientService
        .post(`admin/notification/deliver`, { id: id })
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
  public rejectMessage(id: any, rejectionReason: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClientService
        .post(`admin/notification/reject`, {
          id: id,
          rejectionReason: rejectionReason
        })
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }

  public sendMessage(message: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClientService
        .post(`admin/notification/send`, message)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
  
  public suspendMessage(id: any, suspension_reason: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClientService
        .post(`identity/${id}/account/suspend`, {
          suspension_reason: suspension_reason
        })
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
  public getMessageVehicles(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClientService
        .post(`vehicle/message/${id}`, {})
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
  public getMessageTrips(id: any, criteriaFilter?: any): Promise<any> {
    criteriaFilter = criteriaFilter || {};
    this.utilService.setPagination(criteriaFilter);
    return new Promise((resolve, reject) => {
      this.httpClientService
        .post(`vehicle/trips/message/${id}`, criteriaFilter)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
  public getMessageBookings(id: any, criteriaFilter?: any): Promise<any> {
    criteriaFilter = criteriaFilter || {};
    this.utilService.setPagination(criteriaFilter);
    return new Promise((resolve, reject) => {
      this.httpClientService
        .post(`vehicle/bookings/message/${id}`, criteriaFilter)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
  public getMessagePayments(id: any, criteriaFilter?: any): Promise<any> {
    criteriaFilter = criteriaFilter || {};
    this.utilService.setPagination(criteriaFilter);
    return new Promise((resolve, reject) => {
      this.httpClientService
        .post(`vehicle/payments/message/${id}`, criteriaFilter)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
  public getMessageComplaints(id: any, criteriaFilter?: any): Promise<any> {
    criteriaFilter = criteriaFilter || {};
    this.utilService.setPagination(criteriaFilter);
    return new Promise((resolve, reject) => {
      this.httpClientService
        .post(`vehicle/complaints/message/${id}`, criteriaFilter)
        .subscribe((response: any) => {
          resolve(response);
        }, reject);
    });
  }
}
