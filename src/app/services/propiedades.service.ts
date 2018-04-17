import { Injectable } from '@angular/core';
import { Property } from '../models/property';
import { User } from '../models/user-model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Statistics } from '../models/estadisticas';
import { Fields } from '../models/fields';
import { Router, ActivatedRoute } from '@angular/router';
import { ip } from '../config';

@Injectable()
export class PropiedadesService {
    constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }
    getProperties(): Promise<Property[]> {
        return this.http.get(ip + "/api/legajo" /*?token=" + localStorage.getItem('token').replace(/"/g, '')*/)
            .toPromise()
            .then(response => {
                // if (response["success"])
                    return response as Property[];
                // else {
                    // this.router.navigate(["../login"], { relativeTo: this.activatedRoute });
                    //return this.handleError(response["message"])
                // }
            })
            .catch(this.handleError);
    } 
    getStatistics(): Promise<Statistics> {
        return this.http.get(ip + "/api/statistics")
            .toPromise()
            .then(response => {
                // if (response["success"])
                    return response as Statistics;
            })
            .catch(this.handleError);
    }
    getProperty(id): Promise<Property> {
        return this.http.get(ip + "/api/legajo/" + id /* + "?token=" + localStorage.getItem('token').replace(/"/g, '')*/)
            .toPromise()
            .then(response => {
                // if (response["success"])
                    return response as Property;
                // else {
                //     throw response["message"];
                //     //return this.handleError(response["message"])
                // }
            })
            .catch(this.handleError);
    }
    
    getFields(): Promise<Fields[]> {
        return this.http.get(ip + "/api/field")
            .toPromise()
            .then(response => {
                return response as Fields[];
            })
            .catch(this.handleError);
    }
    searchPropiedades = (columna : string, busqueda: string) : Promise<Property[]> => {
        return this.http.get(ip + '/api/legajo?where={"' + columna + '": {"contains" : "' + busqueda + '"}}')
            .toPromise()
            .then(response => {
                    return response as Property[];
            })
    }
    private handleError(error: any): Promise<any> {
        //console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}