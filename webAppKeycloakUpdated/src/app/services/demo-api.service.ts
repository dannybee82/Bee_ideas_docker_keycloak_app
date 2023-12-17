import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/response-model';

const headers = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DemoApiService {

  private _api: string = environment.endpoint;

  constructor(private http: HttpClient) { }

  getGeneralText() : Observable<ResponseModel> {
    return this.http.get<ResponseModel>(this._api + 'Simple/GetPublicAccessibleMessage', headers)
  }

  getAdminMessage() : Observable<ResponseModel> {
    return this.http.get<ResponseModel>(this._api + 'Simple/GetMessageForAdminsOnly', headers)
  }

  getUserMessage() : Observable<ResponseModel> {
    return this.http.get<ResponseModel>(this._api + 'Simple/GetMessageForUsersOnly', headers)
  }

  getRegisteredMessage() : Observable<ResponseModel> {
    return this.http.get<ResponseModel>(this._api + 'Simple/GetMessageForRegisteredOnly', headers)
  }

}