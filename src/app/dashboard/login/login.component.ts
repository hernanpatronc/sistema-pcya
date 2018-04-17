import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";
import { AuthenticationService } from "../../services/authentication.service";
// import initNotify from "../../../assets/js/notify.js";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { User } from "../../models/user-model";
import { NotifyService } from "../../notify/notify.service";

@Component({
  moduleId: module.id,
  selector: "my-login",
  templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit {
  user: string;
  password: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notifyService : NotifyService
  ) {}
  ngOnInit() {
    // reset login status

    this.authenticationService.logout();
  }
  onLogin = async () => {
    try {
      const currentUser: User = await this.authenticationService.login(
        this.user,
        this.password
      );
      if (currentUser) {
        if (currentUser.privileges == "-1") this.router.navigate(["./dashboard"]);
        else this.router.navigate(["./table"]);
        this.notifyService.newNotification("success","Bienvenido " + currentUser.alias);
      }
    } catch (error) {
      this.user = "";
      this.password = "";
      this.notifyService.newNotification("danger","Error de login: " + error);
    }
  };
}
