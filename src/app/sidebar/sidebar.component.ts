import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user-model';

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[] = [];

    constructor(private authenticationService : AuthenticationService) {}
    ngOnInit() {
        //this.updateMenu();
        const currentUser : User = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser) 
            this.updateMenu(currentUser)
        this.authenticationService.loggedIn.subscribe(user => {
            if (!user)
                this.menuItems = []
            else
                this.updateMenu(user);
        })
    }
    updateMenu(user : User){
        this.menuItems = ROUTES.filter(menuItem => menuItem.privilegesNeeded.includes(user.privileges));
    }
}
