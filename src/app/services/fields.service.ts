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
      .get(ip + '/api/field?where={"columna":"TRADER"}&sort=nombre ASC')
      .toPromise()
      .then(response => {
        // console.log(response)
        return response as Fields[];
      })
      .catch(this.handleError);
  }
  getInmus(): Promise<Fields[]> {
    return this.http
      .get(ip + '/api/field?where={"columna":"TIPO_INMU"}&sort=nombre ASC')
      .toPromise()
      .then(response => {
        // console.log(response)
        return response as Fields[];
      })
      .catch(this.handleError);
  }
  getEstados(): Promise<Fields[]> {
    return this.http
      .get(ip + '/api/field?where={"columna": {"contains" : "ESTADO"}}&sort=nombre ASC')
      .toPromise()
      .then(response => {
        // console.log(response)
        return response as Fields[];
      })
      .catch(this.handleError);
  }
  getPaises(): Promise<Fields[]> {
    return this.http
      .get(ip + '/api/field?where={"columna":"PAIS"}&sort=nombre ASC')
      .toPromise()
      .then(response => {
        // console.log(response)
        return response as Fields[];
      })
      .catch(this.handleError);
  }

  getRegiones() {
    return this.http
      .get(ip + '/api/field?where={"columna":"REGION"}&sort=nombre ASC')
      .toPromise()
      .then(response => {
        // console.log(response)
        return response as Fields[];
      })
      .catch(this.handleError);
  }

  getZonas(): Promise<Fields[]> {
    return this.http
      .get(ip + '/api/field?where={"columna":"ZONA"}&sort=nombre ASC')
      .toPromise()
      .then(response => {
        // console.log(response)
        return response as Fields[];
      })
      .catch(this.handleError);
  }

  getSubzonas(tipo : string): Promise<Fields[]> {
    return this.http
      .get(ip + '/api/field?where={"columna":"SUB_ZONA","tipo":"' +tipo + '"}&sort=nombre ASC')
      .toPromise()
      .then(response => {
        // console.log(response)
        return response as Fields[];
      })
      .catch(this.handleError);
  }

  getCodigos(): Promise<Fields[]> {
    return this.http
      .get(ip + '/api/field?where={"columna":"COD_CAP"}&sort=nombre ASC')
      .toPromise()
      .then(response => {
        // console.log(response)
        return response as Fields[];
      })
      .catch(this.handleError);
  }

  getSubcodigos(tipo: string): Promise<Fields[]> {
    return this.http
      .get(ip + '/api/field?where={"columna":"COD_CAP2","tipo":"' +tipo + '"}&sort=nombre ASC')
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
    // console.log(field);
    
    return this.http
      .put(ip + "/api/field/"+field.id, field)
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
    // console.log(error);
    
    return Promise.reject(error.message || error);
  }
}
