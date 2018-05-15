import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { IconsComponent } from './icons/icons.component';
import { TableComponent } from './table/table.component';
// import { NotificationsComponent } from './notifications/notifications.component';
import { TypographyComponent } from './typography/typography.component';
import { MapsComponent } from './maps/maps.component';
import { LoginComponent } from './login/login.component';
import { PropertyComponent } from './property/property.component';
import { AuthGuard,AdminGuard } from '../authentication/auth.guard';
import { FilesManagerComponent } from './files-manager/files-manager.component';
import { MenuComponent } from './menu/menu.component';

export const MODULE_ROUTES: Route[] =[
    { path: '', component: MenuComponent, canActivate: [AuthGuard], pathMatch: 'full' },
    { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'property/:id', component: PropertyComponent , canActivate: [AuthGuard]},
    { path: 'property', component: PropertyComponent , canActivate: [AuthGuard]},
    { path: 'table', component: TableComponent , canActivate: [AuthGuard]},
    { path: 'icons', component: IconsComponent , canActivate: [AuthGuard]},
    // { path: 'notifications', component: NotificationsComponent , canActivate: [AuthGuard]},
    { path: 'user', component: UserComponent , canActivate: [AdminGuard]},
    { path: 'maps', component: MapsComponent, canActivate: [AuthGuard] },
    { path: 'files', component: FilesManagerComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent}

]

export const MODULE_COMPONENTS = [
    HomeComponent,
    UserComponent,
    TableComponent,
    IconsComponent,
    // NotificationsComponent,
    TypographyComponent,
    MapsComponent,
    LoginComponent,
    PropertyComponent
]
