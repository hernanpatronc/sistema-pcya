import { Injectable } from "@angular/core";
import { ip } from "../config";
import { Fields } from "../models/fields";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class FieldsService {
  constructor(private http: HttpClient) {}
  
  getFields(): Promise<Fields[]> {
    return this.http
      .get(ip + "/api/field")
      .toPromise()
      .then(response => {
        // console.log(response)
        return response as Fields[];
      })
      .catch(this.handleError);
  }

  getTraders(): Promise<Fields[]> {
    return this.http
      .get(ip + '/api/field?where={"columna":"TRADER"}')
      .toPromise()
      .then(response => {
        // console.log(response)
        return response as Fields[];
      })
      .catch(this.handleError);
  }
  getInmus(): Promise<Fields[]> {
    return this.http
      .get(ip + '/api/field?where={"columna":"TIPO_INMU"}')
      .toPromise()
      .then(response => {
        // console.log(response)
        return response as Fields[];
      })
      .catch(this.handleError);
  }
  getEstados(): Promise<Fields[]> {
    return this.http
      .get(ip + '/api/field?where={"columna":"ESTADO"}')
      .toPromise()
      .then(response => {
        // console.log(response)
        return response as Fields[];
      })
      .catch(this.handleError);
  }
  getPaises(): Promise<Fields[]> {
    return this.http
      .get(ip + '/api/field?where={"columna":"PAIS"}')
      .toPromise()
      .then(response => {
        // console.log(response)
        return response as Fields[];
      })
      .catch(this.handleError);
  }
  getZonas(): Promise<Fields[]> {
    return this.http
      .get(ip + '/api/field?where={"columna":"ZONA"}')
      .toPromise()
      .then(response => {
        // console.log(response)
        return response as Fields[];
      })
      .catch(this.handleError);
  }
  getIndices(): Promise<Fields[]> {
    return this.http
      .get(ip + '/api/field?where={"columna":{"contains" : "INDICE"}}')
      .toPromise()
      .then(response => {
        // console.log(response)
        return response as Fields[];
      })
      .catch(this.handleError);
  }

  updateField = (field : Fields) => {
    return this.http
      .put(ip + "/api/field", field)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  postField = (field : Fields) => {
    return this.http
      .post(ip + "/api/field", field)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    //console.error("An error occurred", error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
