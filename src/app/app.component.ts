import { Component, OnInit, ViewChild } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotifyService } from './notify/notify.service';
import { AuthenticationService } from './services/authentication.service';
import { ElectronService } from 'ngx-electron';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    isLoggedIn = false;

    constructor(private authenticationService: AuthenticationService, public notificationService: NotifyService, private _electronService: ElectronService) { }

    ngOnInit() {
        if (localStorage.getItem("currentUser")) {
            this.isLoggedIn = true;
        }
        this.authenticationService.loggedIn.subscribe((user) => {
            if (user) {
                this.isLoggedIn = true;
            }
            else {
                this.isLoggedIn = false;
            }
        });

    }

}
