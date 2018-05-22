import { Component, OnInit, AfterViewInit, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { Property } from '../../models/property';
import { PropiedadesService } from '../../services/propiedades.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotifyService } from '../../notify/notify.service';
import { ElectronService } from 'ngx-electron';
import { Fields } from '../../models/fields';
import { FieldsService } from '../../services/fields.service';

@Component({
    moduleId: module.id,
    selector: 'table-cmp',
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit {
    constructor(private fieldsService : FieldsService,public propiedadesService: PropiedadesService, public notifyService: NotifyService, public router: Router, public activatedRoute: ActivatedRoute, private _electronService: ElectronService) {}
    currentOffset = 0;
    currentPage = 1;
    limit = 20;
    count = 0;
    estados : Fields[] = [];
    tipos_inmu : Fields[] = [];
    provincias : Fields[] = [];
    recentSearched : boolean = false;


    getPage(page) {
        switch (page) {
            case "prev":
                this.currentOffset -= this.limit;
                this.currentPage -= 1;
                this.getProperties();
                break;
            case "next":
                this.currentOffset += this.limit;
                this.currentPage += 1;
                this.getProperties();
                break;
            default:
                this.currentOffset = this.limit * (page-1);
                this.currentPage = page;
                this.getProperties();
                break;
        }

    }    

    async updateLimit(value){
        this.limit = value;
        this.currentOffset = 0;
        this.getProperties();
    }

    async ngOnInit() {
        this.getProperties();
        this.estados = await this.fieldsService.getEstados();
        this.provincias = await this.fieldsService.getZonas();
        this.tipos_inmu = await this.fieldsService.getInmus();
    }
    async getProperties() {
        this.propiedades = await this.propiedadesService.getTableProperties(this.currentOffset,this.limit);
        this.displayingPropiedades = this.propiedades;
    }

    

    async searchAdvanced(desde : string,hasta : string,inmu : string,prov : string,operacion : string){
        let started = false;
        this.recentSearched = true;
        let estadosABuscar = [];
        for (let i = 0; i < this.estados.length; i++){
            if (this.estados[i].nombre == desde){
                started = true;
            }
            if (started){
                estadosABuscar.push(this.estados[i].nombre);
            }
            if (this.estados[i].nombre == hasta) {
                started = false;
            }
        }
        
        let searchObj = {
            ESTADO : estadosABuscar,
            TIPO_INMU : inmu,
            ZONA : prov,
            OFR : operacion
        }
        this.propiedades = await this.propiedadesService.advancedSearchPropiedades(searchObj);
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
        this.recentSearched = false;
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
