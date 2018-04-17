import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
// import { HttpClientModule } from '@angular/http';

import { AppComponent }   from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { DashboardModule } from './dashboard/dashboard.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarModule} from './shared/navbar/navbar.module';

import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { PropiedadesService } from './services/propiedades.service';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard, AdminGuard } from './authentication/auth.guard';
import * as $ from 'jquery';
import { NotifyComponent } from './notify/notify.component';
import { NotifyService } from './notify/notify.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';


@NgModule({
    imports:      [
        BrowserModule,
        DashboardModule,
        SidebarModule,
        NavbarModule,
        FormsModule,
        HttpClientModule,
        NoopAnimationsModule,
        RouterModule.forRoot([])
    ],
    declarations: [ AppComponent, DashboardComponent , NotifyComponent ],
    providers: [{provide: LocationStrategy, useClass: PathLocationStrategy}, PropiedadesService, AuthenticationService, AuthGuard, AdminGuard, NotifyService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }, UserService],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
