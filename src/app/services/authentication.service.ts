import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { ip } from '../config';
 
@Injectable()
export class AuthenticationService {
    @Output() loggedIn: EventEmitter<any> = new EventEmitter();
    constructor(private http: HttpClient) { }
    private handleError(error: any): Promise<any> {
        //console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    private headers = new HttpHeaders({});
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    //     'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    // });
    login(username: string, password: string) : Promise<any>{
        return this.http.post(ip + '/login' /*TODO: Cambiar a /user*/, { username: username, password: password },{headers : this.headers}).toPromise()
            .then((response) => {
                if (response['success']) {
                    localStorage.setItem('currentUser', JSON.stringify(response['user']));
                    localStorage.setItem('token', response['token']);
                    this.loggedIn.emit(response['user'])
                    return response['user'];
                }
                else {
                    throw (response);
                }
            }).catch(this.handleError)
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token')
        this.loggedIn.emit(null);
    }
}