import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { ConfigService } from '../../services/config.service';
import { environment } from "../../../../environments/environment";
import { Config } from '../../models/config';
import { Respuesta } from '../../models/respuesta';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  private confApp: Config;
  private rutaHttp: string = "http://";
  private arrayCategoria: any;

  constructor(private serCategoria: CategoriasService, public _config: ConfigService) { }

  ngOnInit() {
    this._config.getConfig().subscribe(res => {
      console.log(res);
      this.confApp = <Config>res;
      if (this.confApp.ssl) {
        this.rutaHttp = "https://";
      }
      this.rutaHttp = this.rutaHttp + this.confApp.urlserver;
      this.getAllCategorias(this.rutaHttp + environment.getallcategory);
    });
  }

  getAllCategorias(url: string) {
    this.serCategoria.getAllCategories(url).subscribe(res => {
      console.log(res);
      let respuesta : Respuesta = <Respuesta>res;
      if (respuesta.status == "ok") {
        console.log(respuesta.objetos);
        this.arrayCategoria = respuesta.objetos;
      }

    });
  }

}
