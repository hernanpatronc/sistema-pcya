import {Component, OnInit,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';
import { Property } from '../../models/property';
import { PropiedadesService } from '../../services/propiedades.service';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotifyService } from '../../notify/notify.service';

@Component({
    moduleId: module.id,
    selector: 'table-cmp',
    templateUrl: 'table.component.html'
})

export class TableComponent{ 
    constructor(private propiedadesService: PropiedadesService,private notifyService : NotifyService ,private router : Router,private activatedRoute : ActivatedRoute) {
            this.getProperties();
        }
    async getProperties() {
            this.propiedades = await this.propiedadesService.getProperties();
            this.displayingPropiedades = this.propiedades;
        }

    propiedades: Property[];
    displayingPropiedades : Property[];

    propDetail(property) : void {
        this.router.navigate(['../property', property.id],{relativeTo : this.activatedRoute});
    }

    search = async (columna : string, busqueda : string) => {
        try {
            this.displayingPropiedades= await this.propiedadesService.searchPropiedades(columna.toUpperCase(),busqueda.toUpperCase())

        }
        catch (err) {
            this.notifyService.newNotification("danger","Error en la búsqueda " + err)
        }
        // this.displayingPropiedades = this.propiedades.filter((val,index,array) => {
        //     return val[columna].toUpperCase().includes(busqueda.toUpperCase())
        // });
    }
}
