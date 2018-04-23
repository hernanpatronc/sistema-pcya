import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MODULE_COMPONENTS, MODULE_ROUTES } from './dashboard.routes';
import { FormsModule } from '@angular/forms';
import { GeneralComponent } from './property/general/general.component';
import { Campos1Component } from './property/campos1/campos1.component';
import { Campos2Component } from './property/campos2/campos2.component';
import { DeOfLo1Component } from './property/de-of-lo1/de-of-lo1.component';
import { DeOfLo2Component } from './property/de-of-lo2/de-of-lo2.component';
import { CcTc1Component } from './property/cc-tc1/cc-tc1.component';
import { CcTc2Component } from './property/cc-tc2/cc-tc2.component';
import { VuCqTu1Component } from './property/vu-cq-tu1/vu-cq-tu1.component';
import { VuCqTu2Component } from './property/vu-cq-tu2/vu-cq-tu2.component';
import { Ot1Component } from './property/ot1/ot1.component';
import { Ot2Component } from './property/ot2/ot2.component';
import { Fa1Component } from './property/fa1/fa1.component';
import { Fa2Component } from './property/fa2/fa2.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    imports: [
        RouterModule.forChild(MODULE_ROUTES),
        CommonModule,
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCBnl65eOfbu7PS6Z8KCS7utzowp5EdWkE'
        })
    ],
    declarations: [ MODULE_COMPONENTS, GeneralComponent, Campos1Component, Campos2Component, DeOfLo1Component, DeOfLo2Component, CcTc1Component, CcTc2Component, VuCqTu1Component, VuCqTu2Component, Ot1Component, Ot2Component, Fa1Component, Fa2Component ],
    providers : [RouterModule]
})

export class DashboardModule{}
