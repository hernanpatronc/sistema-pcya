import { Component, OnInit, AfterViewInit, trigger, state, style, transition, animate, keyframes, ViewChild, ElementRef } from '@angular/core';
import { User, PRIVILEGES } from '../../models/user-model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
// import initNotify from '../../../assets/js/notify.js';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NotifyService } from '../../notify/notify.service';

@Component({
    moduleId: module.id,
    selector: 'user-cmp',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
    @ViewChild("closeModalButton") closeButton : ElementRef;

    user : User;

    ngOnInit(){
        this.user = new User();
    }

    constructor(public userService: UserService, public notificationService : NotifyService) {
        this.getUsers();
    }
    async getUsers() {
        this.users= await this.userService.getUsers();
    }

    isAdmin = JSON.parse(localStorage.getItem('currentUser')).privileges == "-1"
    async newUser(){
        try {
            await this.userService.postUser(this.user)
            this.users.push(this.user);
            this.notificationService.newNotification("success","Usuario creado");
        }
        catch(err){
            this.notificationService.newNotification("danger","Hubo un error " + err);
        }
        this.closeButton.nativeElement.click();
    }
    users: User[];
    updateUserPriv(user): void {
        //this.router.navigate(['../user', property.LEGAJO],{relativeTo : this.activatedRoute});
    }
}
