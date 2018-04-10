import { Component, OnInit, Input } from "@angular/core";
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

  ngOnInit() {
    this.propiedadesService
      .getFields()
      .then(data => {
        this.traders = data.TRADER.split(",");
        this.tipo_inmus = data.TIPO_INMU.split(",");
        this.estados = data.ESTADO.split(",");
        this.paises = data.PAIS.split(",");
        this.provincias = data.ZONA.split(",");
      })
      .catch(err => this.router.navigate(["/login"]));
  }
}
