import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {AuthenticationService} from '../../services/authentication.service';
import initNotify = require('../../../assets/js/notify.js');
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { User } from '../../models/user-model';

@Component({
    moduleId: module.id,
    selector: 'my-login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    user : string;
    password : string;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) { }
    ngOnInit() {
        // reset login status

        this.authenticationService.logout();

    }
    onLogin() {
        this.authenticationService.login(this.user, this.password)
            .then(
                data => {
                    const currentUser : User = JSON.parse(localStorage.getItem('currentUser'))
                    if (currentUser){
                        if (currentUser.privileges == -1)
                            this.router.navigate(['./dashboard']);
                        else
                            this.router.navigate(['./table']);
                        initNotify("Bienvenido " + currentUser.alias, 2);
                    }
                }).catch(error => {
                    this.user = "";
                    this.password = "";
                });
    }
}
