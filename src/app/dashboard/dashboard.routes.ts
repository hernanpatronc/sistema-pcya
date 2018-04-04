import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { IconsComponent } from './icons/icons.component';
import { TableComponent } from './table/table.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { TypographyComponent } from './typography/typography.component';
import { MapsComponent } from './maps/maps.component';
import { LoginComponent } from './login/login.component';
import { PropertyComponent } from './property/property.component';
import { AuthGuard,AdminGuard } from '../authentication/auth.guard';

export const MODULE_ROUTES: Route[] =[
    { path: '', redirectTo: 'table', pathMatch: 'full' },
    { path: 'dashboard', component: HomeComponent, canActivate: [AdminGuard] },
    { path: 'property/:legajo', component: PropertyComponent , canActivate: [AuthGuard]},
    { path: 'table', component: TableComponent , canActivate: [AuthGuard]},
    { path: 'icons', component: IconsComponent , canActivate: [AuthGuard]},
    { path: 'notifications', component: NotificationsComponent , canActivate: [AuthGuard]},
    { path: 'user', component: UserComponent , canActivate: [AdminGuard]},
    { path: 'maps', component: MapsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent}

]

export const MODULE_COMPONENTS = [
    HomeComponent,
    UserComponent,
    TableComponent,
    IconsComponent,
    NotificationsComponent,
    TypographyComponent,
    MapsComponent,
    LoginComponent,
    PropertyComponent
]
