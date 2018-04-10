import { Component, OnInit, ViewChild } from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotifyService } from './notify/notify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  location: Location;

    constructor(location:Location, private notificationService : NotifyService) {
        this.location = location;
    }
    
    ngOnInit(){
        $.getScript('../assets/js/light-bootstrap-dashboard.js');
    }
    public isMaps(path){
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice( 1 );
        if(path === titlee){
            return true;
        }
        else {
            return false;
        }
    }
}
