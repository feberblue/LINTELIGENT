import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {


  constructor(private _http: HttpClient) {
  }


  /**
   * Leer todas las categorias
   */
  getAllCategories(url: string) {
    return this._http.get(url);
  }

  /**
   * Obtener categoria por ID
   * @param id identificador de la categoria
   */
  getCategoryById(url: string, id: string) {
    return this._http.get(url + "/" + id);
  }

  /**
   * Adicionar categoria
   * @param datainput 
   */
  addCategoria(url: string, datainput) {
    return this._http.post(url, datainput);
  }

  /**
   * Borra una categoria por su identificador
   * @param id Identificador de la categoria a eliminar
   */
  deleteCategoria(url: string, id: string) {
    return this._http.delete(url + "/" + id);
  }

  /**
   * Actualiza una categoria
   * @param id identificador de la categoria
   * @param dataBody datos de la categoria
   */
  updateCategoria(url: string, id: string, dataBody) {
    return this._http.put(url + "/" + id, dataBody);
  }

}
