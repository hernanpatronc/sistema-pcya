import { Injectable } from "@angular/core";
import { Property } from "../models/property";
import { User } from "../models/user-model";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import "rxjs/add/operator/toPromise";
import { Statistics } from "../models/estadisticas";
import { Fields } from "../models/fields";
import { Router, ActivatedRoute } from "@angular/router";
import { ip } from "../config";

@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  getUsers(): Promise<User[]> {
    return this.http
      .get(
        ip +
          "/api/user"
      )
      .toPromise()
      .then(response => {
        return response as User[];
      })
      .catch(this.handleError);
  }
  postUser(user): Promise<any> {
    return this.http
      .post(
        ip +
          "/api/user",
        user
      )
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
