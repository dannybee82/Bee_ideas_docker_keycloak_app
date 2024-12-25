import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Response } from '../models/response/response.interface';

const headers = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
const api: string = environment.endpoint;

@Injectable({
  providedIn: 'root'
})
export class DemoApiService {

  private http = inject(HttpClient);

  getGeneralText() : Observable<Response> {
    return this.http.get<Response>(api + 'Simple/GetPublicAccessibleMessage', headers)
  }

  getAdminMessage() : Observable<Response> {
    return this.http.get<Response>(api + 'Simple/GetMessageForAdminsOnly', headers)
  }

  getUserMessage() : Observable<Response> {
    return this.http.get<Response>(api + 'Simple/GetMessageForUsersOnly', headers)
  }

  getRegisteredMessage() : Observable<Response> {
    return this.http.get<Response>(api + 'Simple/GetMessageForRegisteredOnly', headers)
  }

}