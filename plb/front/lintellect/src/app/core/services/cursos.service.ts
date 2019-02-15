import { Injectable } from '@angular/core';
import { Config } from '../models/config';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  public config: Config;
  public ruta: string = "http://";
  constructor(private _http: HttpClient, public _config: ConfigService) {
    this.getconfig().subscribe(res => {
      this.config = <Config>res;
      if (this.config.ssl) {
        this.ruta = "https://";
      }
    });
  }

 /**
 * Leer configuracion de config.prop.json
 */
  getconfig() {
    return this._config.getConfig();
  }

  


}
