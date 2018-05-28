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
    constructor(private fieldsService: FieldsService, public propiedadesService: PropiedadesService, public notifyService: NotifyService, public router: Router, public activatedRoute: ActivatedRoute, private _electronService: ElectronService) { }
    currentOffset = 0;
    currentPage = 1;
    limit = 20;
    count = 0;
    estados: Fields[] = [];
    tipos_inmu: Fields[] = [];
    provincias: Fields[] = [];
    traders: Fields[] = [];
    recentSearched: boolean = false;


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
                this.currentOffset = this.limit * (page - 1);
                this.currentPage = page;
                this.getProperties();
                break;
        }

    }

    async updateLimit(value) {
        this.limit = value;
        this.currentOffset = 0;
        this.getProperties();
    }

    async ngOnInit() {
        this.getProperties();
        this.estados = await this.fieldsService.getEstados();
        this.provincias = await this.fieldsService.getZonas();
        this.traders = await this.fieldsService.getTraders();
        this.tipos_inmu = await this.fieldsService.getInmus();
    }
    async getProperties() {
        this.propiedades = await this.propiedadesService.getTableProperties(this.currentOffset, this.limit);
        this.displayingPropiedades = this.propiedades;
    }



    async searchAdvanced(desde: string, hasta: string, inmu: string, prov: string, operacion: string, productor: string, trader: string) {
        let started = false;
        this.recentSearched = true;
        let estadosABuscar = [];
        for (let i = 0; i < this.estados.length; i++) {
            if (this.estados[i].nombre == desde) {
                started = true;
            }
            if (started) {
                estadosABuscar.push(this.estados[i].nombre);
            }
            if (this.estados[i].nombre == hasta) {
                started = false;
            }
        }

        let searchObj: any = {
            ESTADO: estadosABuscar,
            TIPO_INMU: {
                "contains": inmu
            },
            ZONA: { "contains": prov },
            OFR: { "contains": operacion },
            TRADER: { "contains": trader }
        }
        if (operacion == '1') {
            searchObj.PRODUCT_O = { "contains": productor };
        }
        else {
            searchObj.PRODUCT_R = { "contains": productor };
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

        if (this._electronService.isElectronApp) {
            let html = `
            <!DOCTYPE html>

<html>

<head>

  <meta charset="utf-8" />
  <link rel="icon" type="image/x-icon" href="./assets/img/favicon.ico">
  <!-- <link rel="icon" type="image/png" href="./assets/img/favicon-16x16.png" sizes="16x16">
  <link rel="icon" type="image/png" href="./assets/img/favicon-32x32.png" sizes="32x32">
  <link rel="icon" type="image/png" href="./assets/img/favicon-96x96.png" sizes="96x96"> -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <base href='./'>
  <title>Sistema Inmobiliario</title>

  <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
  <meta name="viewport" content="width=device-width" />

  <!-- Bootstrap core CSS     -->
  <!-- <link href="assets/css/bootstrap.min.css" rel="stylesheet" /> -->
  <link rel="stylesheet" href="/assets/css/bootstrap.min.css">
  <!-- Animation library for notifications   -->
  <!-- <link href="assets/css/animate.min.css" rel="stylesheet" /> -->

  <!--  Light Bootstrap Table core CSS    -->
  <!-- <link href="assets/css/light-bootstrap-dashboard.css" rel="stylesheet" /> -->

  <!--  CSS for Demo Purpose, don't include it in your project     -->
  <!-- <link href="assets/css/demo.css" rel="stylesheet" /> -->

  <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.min.css"> -->
  <link rel="stylesheet" href="/assets/css/chartist.min.css">
  <!--     Fonts and icons     -->
  <link href="/assets/css/font-awesome.min.css" rel="stylesheet">
  <link href='/assets/css/fonts.css' rel='stylesheet' type='text/css'>
  <link href="/assets/css/pe-icon-7-stroke.css" rel="stylesheet" />

  <link href="/assets/css/styles.css" rel="stylesheet" />

</head>
<!-- 3. Display the application -->

<body>
            ` + document.getElementById("toPrint").innerHTML + '</body></html>';
            this._electronService.ipcRenderer.send("print", )
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
