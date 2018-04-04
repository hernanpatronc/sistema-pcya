import {Component, OnInit,AfterViewInit,trigger,state,style,transition,animate,keyframes} from '@angular/core';
import { Property } from '../../models/property';
import { PropiedadesService } from '../../services/propiedades.service';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'table-cmp',
    templateUrl: 'table.component.html'
})

export class TableComponent{ 
    constructor(private propiedadesService: PropiedadesService, private router : Router,private activatedRoute : ActivatedRoute) {
            this.getProperties();
        }
    async getProperties() {
            this.propiedades = await this.propiedadesService.getProperties();
            this.displayingPropiedades = this.propiedades;
        }

    propiedades: Property[];
    displayingPropiedades : Property[];

    propDetail(property) : void {
        this.router.navigate(['../property', property.LEGAJO],{relativeTo : this.activatedRoute});
    }

    search = async (columna : string, busqueda : string) => {
        this.displayingPropiedades= await this.propiedadesService.searchPropiedades(columna.toUpperCase(),busqueda.toUpperCase())
        // this.displayingPropiedades = this.propiedades.filter((val,index,array) => {
        //     return val[columna].toUpperCase().includes(busqueda.toUpperCase())
        // });
    }
}
