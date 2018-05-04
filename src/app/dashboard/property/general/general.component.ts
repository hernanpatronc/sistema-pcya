import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Property } from "../../../models/property";
import { PropiedadesService } from "../../../services/propiedades.service";
import { Router } from "@angular/router";
import { NotifyService } from "../../../notify/notify.service";
import { FieldsService } from "../../../services/fields.service";
// import { NgForm } from "@angular/forms";

@Component({
  selector: "app-general",
  templateUrl: "./general.component.html",
  styleUrls: ["./general.component.css"]
})
export class GeneralComponent implements OnInit {
  @Input() propiedad: Property;
  @Output() propiedadChanged = new EventEmitter<string>();

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
    private notifyService : NotifyService,
    private fieldsService: FieldsService
  ) {}

  OnLegajoPropertiesChanges() {
    this.estados = this.globalEstados.filter((val,index,array)=>{
      return val.columna == (this.propiedad.OFR =='1' ? "ESTADO_OFR" : "ESTADO_REQ");
    });
    this.propiedad.OPERACION = "PA-" + (this.propiedad.OFR == '1' && this.propiedad.CARACTER == 'OPER' ? this.lasIndexOper : '000');
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
    }
  }

  setLatLong = () => {
    this.lat = 0 - (parseFloat(this.propiedad.COORD_S1) + (parseFloat(this.propiedad.COORD_S2) / 60) + (parseFloat(this.propiedad.COORD_S3)/3600));
    this.long = 0 - (parseFloat(this.propiedad.COORD_W1) + (parseFloat(this.propiedad.COORD_W2) / 60) + (parseFloat(this.propiedad.COORD_W3)/3600));
  }

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
     
      this.lastIndexOfr = parseInt(indices.filter((val,index,array)=>{
        return val.columna == "INDICE_OFR"
      })[0].nombre);
      this.lastIndexReq = parseInt(indices.filter((val,index,array)=>{
        return val.columna == "INDICE_REQ"
      })[0].nombre);
      this.lasIndexOper = parseInt(indices.filter((val,index,array)=>{
        return val.columna == "INDICE_OPE"
      })[0].nombre);
      this.estados = this.globalEstados.filter((val,index,array)=>{
        return val.columna == (this.propiedad.OFR =='1' ? "ESTADO_OFR" : "ESTADO_REQ");
      });
      this.setLatLong();
    }
    
    catch (error) {
      this.notifyService.newNotification("danger","Error buscando los valores " + error);
    }
  }
}
