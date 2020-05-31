import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/finally';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch'; // don't forget this, or you'll get a runtime error
import { environment } from '../../environments/environment';

@Injectable()
export class HttpClientService {
  /*Will be set by global service when updated*/
  authenticationToken: string = null;

  onRequestStarted: BehaviorSubject<any> = new BehaviorSubject(undefined);
  onAllRequestsFinished: BehaviorSubject<any> = new BehaviorSubject(undefined);
  onUnAuthenticatedError: BehaviorSubject<any> = new BehaviorSubject(undefined);
  onHttpError: BehaviorSubject<any> = new BehaviorSubject(undefined);

  constructor(private http: HttpClient, private router: Router) {}

  private appendAuthorizationHeader(headers: HttpHeaders): HttpHeaders {
    if (!headers) {
      headers = new HttpHeaders();
    }
    if (this.authenticationToken) {
      headers = headers.append('X-AUTH-TOKEN', this.authenticationToken);
    }
    return headers;
  }
  private getHttpParams(jsObject) {
    let params = new HttpParams();
    for (var key in jsObject) {
      if (jsObject[key] != null && jsObject[key].toString().trim().length > 0)
        params = params.append(key, jsObject[key]);
    }
    return params;
  }

  currentRequestsCount: number = 0;
  private requestFinished() {
    this.currentRequestsCount--;
    if (this.currentRequestsCount == 0) {
      this.onAllRequestsFinished.next(null);
    }
  }
  private requestStarted() {
    this.currentRequestsCount++;
    if (this.currentRequestsCount == 1) {
      this.onRequestStarted.next(null);
    }
  }
  get(url, paramsObject?: any, headers?: HttpHeaders): Observable<any> {
    this.requestStarted();
    headers = this.appendAuthorizationHeader(headers);
    return this.http
      .get(environment.API_ENDPOINT + url, {
        headers: headers,
        params: this.getHttpParams(paramsObject)
      })
      .map((response: any) => {
        return response;
      })
      .finally(() => this.requestFinished())
      .catch(error => this.handleError(error));
  }

  post(url, body, headers?: HttpHeaders): Observable<any> {
    this.requestStarted();
    headers = this.appendAuthorizationHeader(headers);
    let observable = this.http
      .post(environment.API_ENDPOINT + url, body, { headers: headers })
      .map((response: any) => {
        return response;
      })
      .finally(() => this.requestFinished())
      .catch(error => this.handleError(error));
    return observable;
  }

  put(url, body, headers?: HttpHeaders): Observable<any> {
    this.requestStarted();
    headers = this.appendAuthorizationHeader(headers);
    return this.http
      .put(environment.API_ENDPOINT + url, body, { headers: headers })
      .map((response: any) => {
        return response;
      })
      .finally(() => this.requestFinished())
      .catch(error => this.handleError(error));
  }
  delete(url, headers?: HttpHeaders): Observable<Response> {
    this.requestStarted();
    headers = this.appendAuthorizationHeader(headers);
    return this.http
      .delete(environment.API_ENDPOINT + url, { headers: headers })
      .map((response: any) => {
        return response;
      })
      .finally(() => this.requestFinished())
      .catch(error => this.handleError(error));
  }

  uploadFile(url, file, headers?: HttpHeaders): Observable<any> {
    this.requestStarted();
    let formData: FormData = new FormData();
    formData.append('attachment', file, file.name);
    headers = this.appendAuthorizationHeader(headers);
    /** No need to include Content-Type in Angular 4 */
    let options = { headers: headers };
    return this.http
      .post(environment.API_ENDPOINT + url, formData, options)
      .map((response: any) => {
        return response;
      })
      .finally(() => this.requestFinished())
      .catch(error => this.handleError(error));
  }
  private getErrorMessage(errorReponse: Response | any) {
    if (errorReponse.error) {
      if (errorReponse.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        return 'An error occurred: ' + errorReponse.error.message;
      } else {
        // A client-side or network error occurred. Handle it accordingly.
        return (
          errorReponse.error.message ||
          errorReponse.error.error_description ||
          errorReponse.error.error
        );
      }
    }

    if (errorReponse.message) {
      return errorReponse.message;
    }
    if (errorReponse.statusText) {
      return errorReponse.statusText;
    }
    if (errorReponse.text) {
      return errorReponse.text();
    }
    let errMsg: string;
    if (errorReponse instanceof Response) {
      const body: any = errorReponse.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${errorReponse.status} - ${errorReponse.statusText ||
        ''} ${err}`;
    } else {
      errMsg = errorReponse.toString();
    }
    return errMsg;
  }
  // to avoid multiple message for the same error
  // If we have the same error withing 6 seconds, we will ignore it
  public lastHandlingTimeFor401ErrorInms: number = 0;
  public lastHandlingTimeFor0ErrorInms: number = 0;
  private handleError(error: HttpErrorResponse) {
    let msg = this.getErrorMessage(error);
    if (error.status == 200) {
      this.onHttpError.next(msg);
      return Observable.throw(msg);
    } else if (error.status == 401) {
      if (
        this.lastHandlingTimeFor401ErrorInms === 0 ||
        new Date().getTime() - this.lastHandlingTimeFor401ErrorInms > 6000
      ) {
        this.lastHandlingTimeFor401ErrorInms = new Date().getTime();
        this.onUnAuthenticatedError.next(null);
      }
      this.onHttpError.next(msg);
      return Observable.throw(msg);
    } else if (error.status === 0) {
      let msg =
        // error.message ||
        // error.statusText ||
        'The server is inaccessible or internet connection is not available';
      if (
        this.lastHandlingTimeFor0ErrorInms === 0 ||
        new Date().getTime() - this.lastHandlingTimeFor0ErrorInms > 6000
      ) {
        this.lastHandlingTimeFor0ErrorInms = new Date().getTime();
        this.onHttpError.next(msg);
      }
      return Observable.throw(msg);
    } else {
      this.lastHandlingTimeFor401ErrorInms = 0;
      this.lastHandlingTimeFor0ErrorInms = 0;
      this.onHttpError.next(msg);
      return Observable.throw(msg);
    }
  }
}
