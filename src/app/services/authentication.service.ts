import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {
    @Output() loggedIn: EventEmitter<any> = new EventEmitter();
    constructor(private http: Http) { }
    private handleError(error: any): Promise<any> {
        //console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    login(username: string, password: string) : Promise<any>{
        return this.http.post("http://localhost:3002/user", { username: username, password: password }).toPromise()
            .then((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user.success) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user.user));
                    localStorage.setItem('token', user.token);
                    this.loggedIn.emit(user.user)
                }
                else {
                }
            }).catch(this.handleError)
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.loggedIn.emit(null);
    }
}