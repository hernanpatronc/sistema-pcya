import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Property } from "../../../models/property";
import { PropiedadesService } from "../../../services/propiedades.service";
import { Router } from "@angular/router";
import { NotifyService } from "../../../notify/notify.service";
// import { NgForm } from "@angular/forms";

@Component({
  selector: "app-general",
  templateUrl: "./general.component.html",
  styleUrls: ["./general.component.css"]
})
export class GeneralComponent implements OnInit {
  @Input() propiedad: Property;

  // @ViewChild('propertyForm') form : NgForm;

  traders = [];
  tipo_inmus = [];
  estados = [];
  globalEstados = []
  paises = [];
  provincias = [];
  lastIndexOfr : number = 0;
  lastIndexReq : number = 0;
  lat : number;
  long : number;
  lasIndexOper : number = 0;

  constructor(
    private propiedadesService: PropiedadesService,
    private router: Router,
    private notifyService : NotifyService
  ) {}

  OnLegajoPropertiesChanges() {
    this.estados = this.globalEstados.filter((val,index,array)=>{
      return val.columna == (this.propiedad.OFR =='1' ? "ESTADO_OFR" : "ESTADO_REQ");
    });
    this.propiedad.OPERACION = "PA-" + (this.propiedad.OFR == '1' ? this.lasIndexOper : '000');
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
      this.globalEstados = fields.filter((val,index,array)=>{
        return val.columna.includes("ESTADO");
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
      this.lasIndexOper = parseInt(fields.filter((val,index,array)=>{
        return val.columna == "INDICE_OPE"
      })[0].nombre);
      this.estados = this.globalEstados.filter((val,index,array)=>{
        return val.columna == (this.propiedad.OFR =='1' ? "ESTADO_OFR" : "ESTADO_REQ");
      });
    }
    
    catch (error) {
      this.notifyService.newNotification("danger","Error buscando los valores " + error);
    }
  }
}
