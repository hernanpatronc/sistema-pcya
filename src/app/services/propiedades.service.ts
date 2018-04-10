import { Injectable } from '@angular/core';
import { Property } from '../models/property';
import { User } from '../models/user-model';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Statistics } from '../models/estadisticas';
import { Fields } from '../models/fields';
import { Router, ActivatedRoute } from '@angular/router';
import { ip } from '../config';

@Injectable()
export class PropiedadesService {
    constructor(private http: Http, private router: Router, private activatedRoute: ActivatedRoute) { }
    getProperties(): Promise<Property[]> {
        return this.http.get(ip + "/api/propiedades?token=" + localStorage.getItem('token').replace(/"/g, ''))
            .toPromise()
            .then(response => {
                if (response.json()["success"])
                    return response.json()["data"] as Property[];
                else {
                    this.router.navigate(["../login"], { relativeTo: this.activatedRoute });
                    //return this.handleError(response.json()["message"])
                }
            })
            .catch(this.handleError);
    } // stub
    getStatistics(): Promise<Statistics> {
        return this.http.get(ip + "/api/estadisticas?token=" + localStorage.getItem('token').replace(/"/g, ''))
            .toPromise()
            .then(response => {
                if (response.json()["success"])
                    return response.json()["data"] as Statistics;
                else {
                    this.router.navigate(["../login"], { relativeTo: this.activatedRoute });
                    //return this.handleError(response.json()["message"])
                    throw response.json()
                }

            })
            .catch(this.handleError);
    }
    getProperty(legajo): Promise<Property[]> {
        return this.http.get(ip + "/api/propiedades/" + legajo + "?token=" + localStorage.getItem('token').replace(/"/g, ''))
            .toPromise()
            .then(response => {
                if (response.json()["success"])
                    return response.json()["data"] as Property[];
                else {
                    
                    this.router.navigate(["../login"], { relativeTo: this.activatedRoute });
                    //return this.handleError(response.json()["message"])
                }
            })
            .catch(this.handleError);
    }
    getUsers(): Promise<User[]> {
        return this.http.get(ip + "/api/user?token=" + localStorage.getItem('token').replace(/"/g, ''))
            .toPromise()
            .then(response => {
                if (response.json()["success"])
                    return response.json()["data"] as User[];
                else {
                
                    this.router.navigate(["../login"], { relativeTo: this.activatedRoute });
                    //return this.handleError(response.json()["message"])
                }
            })
            .catch(this.handleError);
    }
    postUser(user): Promise<boolean> {
        return this.http.post(ip + "/api/user/new?token=" + localStorage.getItem('token').replace(/"/g, ''),
            {
                new_user: user,
                user : localStorage.getItem('currentUser')
            })
            .toPromise()
            .then(response => {
                if (response.json()["success"])
                    return true;
                else {

                    //this.router.navigate(["../login"], { relativeTo : this.activatedRoute});
                    //return this.handleError(response.json()["message"])
                }
            })
            .catch(this.handleError);
    }
    getFields(): Promise<Fields> {
        return this.http.get(ip + "/api/fields?token=" + localStorage.getItem('token').replace(/"/g, ''))
            .toPromise()
            .then(response => {
                if (response.json()["success"])
                    return response.json()["data"][0] as Fields;
                else {
                    
                    this.router.navigate(["../login"], { relativeTo: this.activatedRoute });
                    //return this.handleError(response.json()["message"])
                }
            })
            .catch(this.handleError);
    }
    searchPropiedades = (columna : string, busqueda: string) : Promise<Property[]> => {
        return this.http.get(ip + "/api/propiedades?columna=" + columna + "&busqueda=" + busqueda + "&token=" + localStorage.getItem('token').replace(/"/g, ''))
            .toPromise()
            .then(response => {
                if (response.json()["success"])
                    return response.json()["data"] as Property[];
                else {
                    this.router.navigate(["../login"], { relativeTo: this.activatedRoute });
                    return [];
                    //return this.handleError(response.json()["message"])
                }
            })
    }
    private handleError(error: any): Promise<any> {
        //console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}