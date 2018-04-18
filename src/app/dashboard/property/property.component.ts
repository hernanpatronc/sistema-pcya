import {
  Component,
  state,
  style,
  animate,
  transition,
  trigger,
  keyframes,
  OnInit,
  OnDestroy,
  OnChanges
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Property } from "../../models/property";
import { PropiedadesService } from "../../services/propiedades.service";
import { FormsModule } from "@angular/forms";
import { NotifyService } from "../../notify/notify.service";
// import initNotify from "../../../assets/js/notify.js";

@Component({
  moduleId: module.id,
  selector: "prop-cmp",
  templateUrl: "property.component.html"
})
export class PropertyComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private propiedadesService: PropiedadesService,
    private notifyService : NotifyService
  ) {}
  id: string;
  tipo_propiedad = {
    value: "",
    nombre: ""
  };
  propiedad = new Property();

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    if (this.id) {
        try {
            this.propiedad = /*await this.propiedadesService.getProperty(
                this.id
              );*/ this.propiedadesService.currentProperty;
        }
        catch (err) {
            // initNotify("Error buscando legajo ", 4);

            this.notifyService.newNotification("danger", "Error buscando el legajo " + err)
        }
      
      this.setTipoPropiedad(this.propiedad.TIPO_INMU);
    } else {
      this.propiedadesService.currentProperty = this.propiedad;
    }
  }

  updatePropertyGlobal = ($event) => {
      console.log("Actualizada propiedad " + this.propiedad.LEGAJO)
  }

  setTipoPropiedad = (tipo_inmu : string) => {
    //   console.log(tipo_inmu)
    switch (tipo_inmu) {
        case "CA":
          this.tipo_propiedad.nombre = "Campos";
          this.tipo_propiedad.value = "campos";
          break;
        case "DE":
        case "OF":
        case "LO":
            this.tipo_propiedad.nombre = "DE-OF-LO";
            this.tipo_propiedad.value = "deoflo";
            break;
        case "CC":
        case "TC":
            this.tipo_propiedad.nombre = "CC-TC";
            this.tipo_propiedad.value = "cctc";
            break;
        case "VU":
        case "CQ":
        case "TU":
            this.tipo_propiedad.nombre = "VU-CQ-TU";
            this.tipo_propiedad.value = "vucqtu";
            break;
        case "OT":
            this.tipo_propiedad.nombre = "OT";
            this.tipo_propiedad.value = "ot";
            break;
        case "FA":
            this.tipo_propiedad.nombre = "FA";
            this.tipo_propiedad.value = "fa";
            break;
      }
  }
}
