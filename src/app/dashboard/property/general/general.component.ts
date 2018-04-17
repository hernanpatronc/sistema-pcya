import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Property } from "../../../models/property";
import { PropiedadesService } from "../../../services/propiedades.service";
import { Router } from "@angular/router";

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
  lastIndex : number = 1532;

  constructor(
    private propiedadesService: PropiedadesService,
    private router: Router
  ) {}

  OnLegajoPropertiesChanges() {
    if (
      this.propiedad.OFR &&
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
        this.lastIndex;
      this.lastIndex++;
    }
  }

  async ngOnInit() {
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
    }
    
    catch (error) {

    }
  }
}
