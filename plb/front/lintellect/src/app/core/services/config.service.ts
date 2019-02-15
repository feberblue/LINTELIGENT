import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private _http: HttpClient) { }

  getConfig(){
    return this._http.get('assets/config.prop.json');
  }
}
