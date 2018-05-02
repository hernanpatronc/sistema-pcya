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
    //console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
