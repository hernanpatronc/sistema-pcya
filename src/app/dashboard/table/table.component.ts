import { Component, OnInit, AfterViewInit, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { Property } from '../../models/property';
import { PropiedadesService } from '../../services/propiedades.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotifyService } from '../../notify/notify.service';
import { ElectronService } from 'ngx-electron';

@Component({
    moduleId: module.id,
    selector: 'table-cmp',
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit {
    constructor(public propiedadesService: PropiedadesService, public notifyService: NotifyService, public router: Router, public activatedRoute: ActivatedRoute, private _electronService: ElectronService) {}
    currentOffset = 0;

    async updateOffset(){
        this.currentOffset += 50;
        this.propiedades = await this.propiedadesService.getTableProperties(this.currentOffset,50);
        this.displayingPropiedades = this.propiedades;
    }

    ngOnInit() {
        this.getProperties();
    }
    async getProperties() {
        this.propiedades = await this.propiedadesService.getTableProperties(0,50);
        this.displayingPropiedades = this.propiedades;
    }

    propiedades: Property[];
    displayingPropiedades: Property[];

    propDetail(property): void {
        this.propiedadesService.currentProperty = property;
        this.router.navigate(['../property', property.id], { relativeTo: this.activatedRoute });
    }

    print = () => {
        if (this._electronService.isElectronApp){
            this._electronService.ipcRenderer.emit("print")
        }
        else {
            window.print()
        }
    }

    search = async (columna: string, busqueda: string) => {
        try {
            this.displayingPropiedades = await this.propiedadesService.searchPropiedades(columna.toUpperCase(), busqueda.toUpperCase())

        }
        catch (err) {
            this.notifyService.newNotification("danger", "Error en la búsqueda " + err)
        }
        // this.displayingPropiedades = this.propiedades.filter((val,index,array) => {
        //     return val[columna].toUpperCase().includes(busqueda.toUpperCase())
        // });
    }
}
