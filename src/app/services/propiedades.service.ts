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

    currentProperty : Property = new Property();
    disableForm : boolean = true;

    constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) { }

    getTableProperties = (offset : number, limit:number) => {
        return this.http.get(ip + "/api/legajo?limit=" + limit + "&skip=" + offset + "&select=LEGAJO,NOMBRE_INM,OFER_REQUE,ESTADO,TRADER")
            .toPromise()
            .then(response => {
                    return response as Property[];

            })
            .catch(this.handleError);
    }

    getProperties(columna? : string, busqueda? : string): Promise<Property[]> {
        if (!columna && !busqueda) {
            return this.http.get(ip + "/api/legajo")
            .toPromise()
            .then(response => {
                    return response as Property[];

            })
            .catch(this.handleError);
        }
        else {
            return this.http.get(ip + '/api/legajo?where={"' + columna + '" : {"contains" : "'+ busqueda +'"}}' )
            .toPromise()
            .then(response => {

                    return response as Property[];

            })
            .catch(this.handleError);
        }
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

    postProperty = (legajo : Property) => {
        // console.log(ip+ "/api/legajo/" + legajo.id);
        
        return this.http.post(ip + "/api/legajo/", legajo)
            .toPromise()
            .then(response => {
                // if (response["success"])
                    return response;
            })
            .catch(this.handleError);
    }

    updateProperty = (legajo : Property) => {
        // if (legajo.VTO_AUTORI.toString() == "0000-00-00"){
        //     // console.log("Invalid Date");
        //     legajo.VTO_AUTORI = new Date(2010,10,10);
        // }
        // if (legajo.FEC_ULT_PR.toString() == "0000-00-00"){
        //     // console.log("Invalid Date");
        //     legajo.FEC_ULT_PR = new Date(2010,10,10);
        // }
        // if (legajo.FECHA_HORA.toString() == "0000-00-00"){
        //     // console.log("Invalid Date");
        //     legajo.FECHA_HORA = new Date(2010,10,10);
        // }
        // if (legajo.FECHA.toString() == "0000-00-00"){
        //     // console.log("Invalid Date");
        //     legajo.FECHA_HORA = new Date();
        // }
        return this.http.put(ip + "/api/legajo/" + legajo.id, legajo)
            .toPromise()
            .then(response => {
                // if (response["success"])
                    return response;
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
        // console.log(error);
        
        //console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}