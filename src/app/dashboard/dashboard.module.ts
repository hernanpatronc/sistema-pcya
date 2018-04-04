import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './dashboard.routes';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        RouterModule.forChild(MODULE_ROUTES),
        CommonModule,
        FormsModule
    ],
    declarations: [ MODULE_COMPONENTS ],
    providers : [RouterModule]
})

export class DashboardModule{}
