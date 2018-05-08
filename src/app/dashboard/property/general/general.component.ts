import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Property } from "../../../models/property";
import { PropiedadesService } from "../../../services/propiedades.service";
import { Router } from "@angular/router";
import { NotifyService } from "../../../notify/notify.service";
import { FieldsService } from "../../../services/fields.service";
import { Fields } from "../../../../../sistinmo-frontend-cli-win32-x64/resources/app/src/app/models/fields";

// import { NgForm } from "@angular/forms";

@Component({
  selector: "app-general",
  templateUrl: "./general.component.html",
  styleUrls: ["./general.component.css"]
})
export class GeneralComponent implements OnInit {
  @Input() propiedad: Property;
  @Output() propiedadChanged = new EventEmitter<string>();
  toAddField : Fields = new Fields();
  // @ViewChild('propertyForm') form : NgForm;

  traders = [];
  tipo_inmus = [];
  estados = [];
  globalEstados = [];
  paises = [];
  provincias = [];
  lastIndexOfr: number = 0;
  lastIndexReq: number = 0;
  lat: number = -34.6083;
  long: number =  -58.3712;
  lasIndexOper: number = 0;

  constructor(
    private propiedadesService: PropiedadesService,
    private router: Router,
    private notifyService: NotifyService,
    private fieldsService: FieldsService
  ) {}

  OnLegajoPropertiesChanges() {
    this.estados = this.globalEstados.filter((val, index, array) => {
      return (
        val.columna == (this.propiedad.OFR == "1" ? "ESTADO_OFR" : "ESTADO_REQ")
      );
    });
    // console.log(this.estados, this.globalEstados)
    this.propiedad.OPERACION =
      "PA-" +
      (this.propiedad.OFR == "1" && this.propiedad.CARACTER == "OPER"
        ? this.lasIndexOper
        : "000");
    if (
      this.propiedad.OFR == "1" &&
      this.propiedad.ZONA &&
      this.propiedad.TIPO_INMU &&
      this.propiedad.TIPO_OPERA &&
      this.propiedad.PAIS
    ) {
      this.propiedad.LEGAJO =
        this.propiedad.PAIS.substring(0, 1) +
        "-" +
        this.propiedad.TIPO_OPERA +
        "-" +
        this.propiedad.OFR +
        "-" +
        this.propiedad.TIPO_INMU +
        "-" +
        this.propiedad.ZONA +
        "-" +
        this.lastIndexOfr;
    } else if (
      this.propiedad.OFR == "2" &&
      this.propiedad.ZONA &&
      this.propiedad.TIPO_INMU &&
      this.propiedad.TIPO_OPERA &&
      this.propiedad.PAIS
    ) {
      this.propiedad.LEGAJO =
        this.propiedad.PAIS.substring(0, 1) +
        "-" +
        this.propiedad.TIPO_OPERA +
        "-" +
        this.propiedad.OFR +
        "-" +
        this.propiedad.TIPO_INMU +
        "-" +
        this.propiedad.ZONA +
        "-" +
        this.lastIndexReq;
    }
  }

  newField = (columna : string) => {
    this.toAddField.columna = columna;
    this.toAddField.nombre = "";
    this.toAddField.descripcion = "";
  }

  setLatLong = () => {
    if (this.propiedad.COORD_S1 && this.propiedad.COORD_W1 && this.propiedad.COORD_W2  && this.propiedad.COORD_W3  && this.propiedad.COORD_S2  && this.propiedad.COORD_S3) {
      this.lat =
        0 -
        (parseFloat(this.propiedad.COORD_S1) +
          parseFloat(this.propiedad.COORD_S2) / 60 +
          parseFloat(this.propiedad.COORD_S3) / 3600);
      this.long =
        0 -
        (parseFloat(this.propiedad.COORD_W1) +
          parseFloat(this.propiedad.COORD_W2) / 60 +
          parseFloat(this.propiedad.COORD_W3) / 3600);
    }
  };

  placeMarker($event) {
    this.lat = $event.coords.lat;
    this.long = $event.coords.lng;
    this.formatLatLong();
  }

  formatLatLong = () => {
    let latGrados = Math.trunc(this.lat);
    let latDecimal = (this.lat - latGrados) * 60;
    let latMinutos = Math.trunc(latDecimal);
    let latSegundos = Math.abs((latDecimal - latMinutos) * 60).toFixed(2);

    let longGrados = Math.trunc(this.long);
    let longDecimal = (this.long - longGrados) * 60;
    let longMinutos = Math.trunc(longDecimal);
    let longSegundos = Math.abs((longDecimal - longMinutos) * 60).toFixed(2);

    this.propiedad.COORD_S1 = Math.abs(latGrados).toString();
    this.propiedad.COORD_S2 = Math.abs(latMinutos).toString();
    this.propiedad.COORD_S3 = latSegundos;
    this.propiedad.COORD_W1 = Math.abs(longGrados).toString();
    this.propiedad.COORD_W2 = Math.abs(longMinutos).toString();
    this.propiedad.COORD_W3 = longSegundos;
  };



  async ngOnInit() {
    // console.log(this.lat,this.long)
    try {
      // let fields = await this.fieldsService.getFields()
      this.traders = await this.fieldsService.getTraders();
      this.tipo_inmus = await this.fieldsService.getInmus();
      this.globalEstados = await this.fieldsService.getEstados();
      this.paises = await this.fieldsService.getPaises();
      this.provincias = await this.fieldsService.getZonas();
      let indices = await this.fieldsService.getIndices();

      this.lastIndexOfr = parseInt(
        indices.filter((val, index, array) => {
          return val.columna == "INDICE_OFR";
        })[0].nombre
      );
      this.lastIndexReq = parseInt(
        indices.filter((val, index, array) => {
          return val.columna == "INDICE_REQ";
        })[0].nombre
      );
      this.lasIndexOper = parseInt(
        indices.filter((val, index, array) => {
          return val.columna == "INDICE_OPE";
        })[0].nombre
      );
      this.estados = this.globalEstados.filter((val, index, array) => {
        return (
          val.columna ==
          (this.propiedad.OFR == "1" ? "ESTADO_OFR" : "ESTADO_REQ")
        );
      });
      // console.log(this.estados)
      this.setLatLong();
    } catch (error) {
      this.notifyService.newNotification(
        "danger",
        "Error buscando los valores " + error
      );
    }
  }
}
