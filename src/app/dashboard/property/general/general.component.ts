import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Property } from "../../../models/property";
import { PropiedadesService } from "../../../services/propiedades.service";
import { Router } from "@angular/router";
import { NotifyService } from "../../../notify/notify.service";

@Component({
  selector: "app-general",
  templateUrl: "./general.component.html",
  styleUrls: ["./general.component.css"]
})
export class GeneralComponent implements OnInit {
  @Input() propiedad: Property;
  @Output() updateProperty = new EventEmitter<string>();
  traders = [];
  tipo_inmus = [];
  estados = [];
  paises = [];
  provincias = [];
  lastIndexOfr : number = 0;
  lastIndexReq : number = 0;
  lat : number;
  long : number;
  constructor(
    private propiedadesService: PropiedadesService,
    private router: Router,
    private notifyService : NotifyService
  ) {}

  OnLegajoPropertiesChanges() {
    if (
      this.propiedad.OFR =="1" &&
      this.propiedad.ZONA &&
      this.propiedad.TIPO_INMU &&
      this.propiedad.TIPO_OPERA &&
      this.propiedad.PAIS
    ) {
      this.propiedad.LEGAJO =
        this.propiedad.PAIS.substring(0,1) +
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
      this.lastIndexOfr++;
    } else if (
      this.propiedad.OFR =="2" &&
      this.propiedad.ZONA &&
      this.propiedad.TIPO_INMU &&
      this.propiedad.TIPO_OPERA &&
      this.propiedad.PAIS
    ) {
      this.propiedad.LEGAJO =
        this.propiedad.PAIS.substring(0,1) +
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
      this.lastIndexReq++;
    }
  }

  setLatLong = () => {
    this.lat = 0 - (parseInt(this.propiedad.COORD_S1) + (parseInt(this.propiedad.COORD_S2) / 60) + (parseFloat(this.propiedad.COORD_S3)/3600));
    this.long = 0 - (parseInt(this.propiedad.COORD_W1) + (parseInt(this.propiedad.COORD_W2) / 60) + (parseFloat(this.propiedad.COORD_W3)/3600));
  }

  async ngOnInit() {
    this.setLatLong();
    // console.log(this.lat,this.long)
    try {
      let fields = await this.propiedadesService.getFields()
      // console.log(fields)
      this.traders = fields.filter((val,index,array)=>{
        return val.columna == "TRADER";
      });
      this.tipo_inmus = fields.filter((val,index,array)=>{
        return val.columna == "TIPO_INMU";
      });
      this.estados = fields.filter((val,index,array)=>{
        return val.columna == "ESTADO";
      });
      this.paises = fields.filter((val,index,array)=>{
        return val.columna == "PAIS";
      });
      this.provincias = fields.filter((val,index,array)=>{
        return val.columna == "ZONA";
      });
      this.lastIndexOfr = parseInt(fields.filter((val,index,array)=>{
        return val.columna == "INDICE_OFR"
      })[0].nombre);
      this.lastIndexReq = parseInt(fields.filter((val,index,array)=>{
        return val.columna == "INDICE_REQ"
      })[0].nombre);
    }
    
    catch (error) {
      this.notifyService.newNotification("danger","Error buscando los valores " + error);
    }
  }
}
