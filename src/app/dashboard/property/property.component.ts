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
import { FieldsService } from "../../services/fields.service";
import { ficha_interna } from "./ficha_interna";
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
    private notifyService: NotifyService,
    private fieldsService : FieldsService
  ) {}
  id: string;
  tipo_propiedad = {
    value: "",
    nombre: ""
  };
  propiedad = new Property();

  print = () => {
    var newWindow = window.open('about:blank', '_new');
    newWindow.document.open();
    newWindow.document.write(ficha_interna);
    newWindow.document.close();
    // newWindow.focus(); // necessary for IE >= 10*/
    // window.
    // newWindow.print();
    // newWindow.close();

  }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    if (this.id) {
      try {
        this.propiedad = /*await this.propiedadesService.getProperty(
                this.id
              );*/ this.propiedadesService.currentProperty;
        if (!this.propiedad.LEGAJO) {
          this.propiedad = await this.propiedadesService.getProperty(this.id);
        }
      } catch (err) {
        // initNotify("Error buscando legajo ", 4);

        this.notifyService.newNotification(
          "danger",
          "Error buscando el legajo " + err
        );
      }
      this.propiedadesService.disableForm = true;

      this.setTipoPropiedad(this.propiedad.TIPO_INMU);
    } else {
      this.propiedadesService.currentProperty = this.propiedad;
      this.propiedadesService.disableForm = false;
      this.propiedad.FECHA = new Date();
      this.propiedad.PAIS = "AR"
      this.propiedad.OPERACION = "PA-000";
    }
  }

  actualizarLegajo = async () => {
    // console.log(this.propiedad.FECHA, this.propiedad.VTO_AUTORI)
    try {
      if (this.propiedad.id) {
        await this.propiedadesService.updateProperty(this.propiedad);
      } else {
        await this.propiedadesService.postProperty(this.propiedad);
      }
      if (this.propiedad.OFR == "1"){
        if (this.propiedad.CARACTER == "OPER"){
          this.fieldsService.updateField({
            nombre: "",
            descripcion: "",
            columna: "INDICE_OPE"
          })

        }
        this.fieldsService.updateField({
          nombre: "",
          descripcion: "",
          columna: "INDICE_OFR"
        })
      }
      else {
        this.fieldsService.updateField({
          nombre: "",
          descripcion: "",
          columna: "INDICE_REQ"
        })
      }
      // this.fieldsService.updateField()
      this.notifyService.newNotification(
        "success",
        "Se ha actualizado el legajo"
      );
      // this.propiedadesService.
    } catch (err) {
      this.notifyService.newNotification(
        "danger",
        "Error actualizando legajo " + err
      );
    }
  };

  resetProperty = async () => {
    try {
      this.propiedad = await this.propiedadesService.getProperty(
        this.propiedad.id
      );
      // this.notifyService.newNotification("success", "Se ha actualizado el legajo")
    } catch (err) {
      this.notifyService.newNotification(
        "danger",
        "Error buscando legajo " + err
      );
    }
  };

  setTipoPropiedad = (tipo_inmu: string) => {
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
  };
}
