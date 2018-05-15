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
  OnChanges,
  ViewChild
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Property } from "../../models/property";
import { PropiedadesService } from "../../services/propiedades.service";
import { FormsModule, FormGroup, FormControl } from "@angular/forms";
import { NotifyService } from "../../notify/notify.service";
import { FieldsService } from "../../services/fields.service";
import { ficha_interna } from "./ficha_interna";
import { GeneralComponent } from "./general/general.component";
import { ElectronService } from "ngx-electron";
// import initNotify from "../../../assets/js/notify.js";

@Component({
  moduleId: module.id,
  selector: "prop-cmp",
  templateUrl: "property.component.html"
})
export class PropertyComponent implements OnInit {
  constructor(
    private _electronService: ElectronService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public propiedadesService: PropiedadesService,
    public notifyService: NotifyService,
    public fieldsService: FieldsService
  ) { }
  id: string;
  tipo_propiedad = {
    value: "",
    nombre: ""
  };
  propiedad = new Property();
  @ViewChild(GeneralComponent) generalComp: GeneralComponent;

  print = () => {
    // ficha_interna.replace()
    
    let htmlFicha = ficha_interna.replace(
      /\{\{(.{1,10})\}\}/g,
      (substring, args) => {
        let textoAReemplazar = this.propiedad[substring.replace(/(\{|\})/g, "")];
        // console.log(textoAReemplazar);
        if (substring.replace(/(\{|\})/g, "")=="FECHA"){
          let fecha = textoAReemplazar as Date;
          textoAReemplazar = fecha.getDate() + "/" + (fecha.getMonth()+1) + "/" + fecha.getFullYear();
        }
        return textoAReemplazar ? textoAReemplazar : "";
      }
    );
    if (!this._electronService.isElectronApp) {
      var newWindow = window.open("about:blank", "_new");
      newWindow.document.open();
      newWindow.document.write(htmlFicha);
      newWindow.document.close();
    }
    else {
      htmlFicha = htmlFicha.replace('onload="window.print();window.close()"',"");
      this._electronService.ipcRenderer.send("print",htmlFicha);
    }

    // newWindow.focus(); // necessary for IE >= 10*/
    // window.
    // newWindow.print();
    // newWindow.close();
  };

  onSubmit() {
    this.generalComp.submit();
  }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    if (this.id) {
      try {
        this.propiedad = /*await this.propiedadesService.getProperty(
                this.id
              );*/ await this.propiedadesService.getProperty(this.id);
        
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
      this.propiedad.FECHA = new Date().getTime();
      this.propiedad.PAIS = "AR";
      this.propiedad.OPERACION = "PA-000";
    }
  }



  resetProperty = async () => {
    if (this.propiedad.id) {
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
    } else {
      this.propiedad = new Property();
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
