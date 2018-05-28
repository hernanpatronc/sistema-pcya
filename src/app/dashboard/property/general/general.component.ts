import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from "@angular/core";
import { Property } from "../../../models/property";
import { PropiedadesService } from "../../../services/propiedades.service";
import { Router } from "@angular/router";
import { NotifyService } from "../../../notify/notify.service";
import { FieldsService } from "../../../services/fields.service";
import { Fields } from "../../../models/fields";
import { FormsModule, FormGroup, FormControl, NgForm } from "@angular/forms";
// import { Fields } from "../../../../../sistinmo-frontend-cli-win32-x64/resources/app/src/app/models/fields";

// import { NgForm } from "@angular/forms";

@Component({
  selector: "app-general",
  templateUrl: "./general.component.html",
  styleUrls: ["./general.component.css"]
})
export class GeneralComponent implements OnInit {
  @Input() propiedad: Property;
  @Output() propiedadChanged = new EventEmitter<string>();
  toAddField: Fields = new Fields();
  @ViewChild('propertyForm') form: NgForm;

  traders = [];
  tipo_inmus = [];
  estados = [];
  globalEstados = [];
  paises = [];
  provincias = [];
  regiones = [];
  subzonas = [];
  codigos = [];
  subcodigos = [];
  currentLegajos: Property[] = [];
  legajoCierre: Property = new Property();
  legajos: Property[] = [];
  lastIndexOfr: Fields = new Fields();
  lastIndexReq: Fields = new Fields();
  lat: number = -34.6083;
  long: number = -58.3712;
  lasIndexOper: Fields = new Fields();
  editable = true;

  constructor(
    public propiedadesService: PropiedadesService,
    public router: Router,
    public notifyService: NotifyService,
    public fieldsService: FieldsService
  ) { }

  searchLegajos = async (columna: string, search: string) => {
    this.currentLegajos = await this.propiedadesService.getProperties(columna, search);
  }

  cerrarLegajo = () => {
    this.propiedad.LEGAJO_REQ = this.legajoCierre.LEGAJO;
    this.propiedad.NOM_REQUER = this.legajoCierre.OFER_REQUE;
    this.propiedad.TRADER_ER = this.legajoCierre.TRADER_ER;
    this.propiedad.PRODUCT_R = this.legajoCierre.PRODUCT_R;
    this.propiedad.INFORM_REQ = this.legajoCierre.INFORM_REQ;
    this.propiedad.INFORM_RE2 = this.legajoCierre.INFORM_RE2;
  }

  selectLegajo = (legajo: Property) => {
    this.legajoCierre = legajo;
    this.propiedad.LEGAJO_REQ = this.legajoCierre.LEGAJO;
    this.propiedad.NOM_REQUER = this.legajoCierre.OFER_REQUE;
  }

  onZonaChosen = async (value: string) => {
    // console.log(value);

    this.subzonas = await this.fieldsService.getSubzonas(value);
    this.OnLegajoPropertiesChanges();
  }

  onCodigoChosen = async (value: string) => {
    this.subcodigos = await this.fieldsService.getSubcodigos(value);
  }

  updateNombre = (tipo : string)  => {
    this.propiedad[tipo] = this.propiedad[tipo].toLocaleUpperCase();
  }

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
        ? this.lasIndexOper.nombre
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
        parseInt(this.lastIndexOfr.nombre);
    } else if (
      this.propiedad.OFR == "2" &&
      this.propiedad.ZONA &&
      this.propiedad.TIPO_INMU &&
      this.propiedad.TIPO_OPERA &&
      this.propiedad.PAIS
    ) {
      this.propiedad.NOMBRE_INM = "XXXXXXXXXXXXXXXXXXXXXX";
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
        parseInt(this.lastIndexReq.nombre);
    }
  }

  updateNombreInmueble = (value : string) => {
    this.propiedad.NOMBRE_INM = this.propiedad.OFR == '1' ? this.lastIndexOfr.nombre + value.substr(0,2) + '-' : "XXXXXXXXXXXXXXXXXXXXXX";
  }

  createField = async () => {
    try {
      // this.fieldsService.postField(this.toAddField);
      // console.log(this.toAddField);
      switch (this.toAddField.columna) {
        case "ESTADO_REQ":
        case "ESTADO_OFR":
        case "TRADER":
        case "COD_CAP":
          break;
        case "COD_CAP2":
          this.toAddField.tipo = this.propiedad.COD_CAP;
          break;
        case "REGION":
          this.toAddField.tipo = this.propiedad.PAIS;
          break;
        case "SUB_ZONA":
          this.toAddField.tipo = this.propiedad.ZONA;
          break;

      }
      await this.fieldsService.postField(this.toAddField)
      this.notifyService.newNotification("success", "Agregado nuevo " + this.toAddField.columna);
    }
    catch (err) {
      this.notifyService.newNotification("danger", err);
    }
  }

  newField = (columna: string) => {
    this.toAddField.columna = columna;
    this.toAddField.nombre = "";
    this.toAddField.descripcion = "";
    this.toAddField.tipo = "";
  }

  setLatLong = () => {
    if (this.propiedad.COORD_S1 && this.propiedad.COORD_W1 && this.propiedad.COORD_W2 && this.propiedad.COORD_W3 && this.propiedad.COORD_S2 && this.propiedad.COORD_S3) {
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
    if (this.propiedad.LEGAJO) {
      this.editable = false;
    }
    // console.log(this.lat,this.long)
    try {
      // let fields = await this.fieldsService.getFields()
      this.traders = await this.fieldsService.getTraders();
      this.tipo_inmus = await this.fieldsService.getInmus();
      this.globalEstados = await this.fieldsService.getEstados();
      this.paises = await this.fieldsService.getPaises();
      this.provincias = await this.fieldsService.getZonas();
      let indices = await this.fieldsService.getIndices();
      this.regiones = await this.fieldsService.getRegiones();
      this.codigos = await this.fieldsService.getCodigos();
      this.lastIndexOfr = indices.filter((val, index, array) => {
        return val.columna == "INDICE_OFR";
      })[0];
      this.lastIndexReq = indices.filter((val, index, array) => {
        return val.columna == "INDICE_REQ";
      })[0];
      this.lasIndexOper = indices.filter((val, index, array) => {
        return val.columna == "INDICE_OPE";
      })[0];
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

  submit() {
    // console.log(this.form)
    // console.log(this.propiedad.ESTADO);

    this.validateAllFormFields(this.form.form);
    if (this.form.valid) {
      this.actualizarLegajo();
      // this.propiedadesService.
      this.propiedadesService.disableForm = true;
    }
    else {
      this.notifyService.newNotification("danger", "Hay campos invalidos (marcados en rojo)")
    }

  }


  actualizarLegajo = async () => {
    // console.log(this.propiedad.FECHA, this.propiedad.VTO_AUTORI)
    try {
      if (this.propiedad.id) {
        await this.propiedadesService.updateProperty(this.propiedad);
        this.notifyService.newNotification(
          "success",
          "Se ha actualizado el legajo"
        );
      } else {
        let response = await this.propiedadesService.postProperty(this.propiedad);
        console.log(response);
        
        this.notifyService.newNotification(
          "success",
          "Se ha actualizado el legajo"
        );
        if (this.propiedad.OFR == "1") {
          if (this.propiedad.CARACTER == "OPER") {
            
            this.lasIndexOper.nombre = (parseInt(this.lasIndexOper.nombre) + 1).toString();
            
            
            this.fieldsService.updateField(this.lasIndexOper);
          }
          
          this.lastIndexOfr.nombre = (parseInt(this.lastIndexOfr.nombre) + 1).toString();
          this.fieldsService.updateField(this.lastIndexOfr);

        } else {
          this.lastIndexReq.nombre = (parseInt(this.lastIndexReq.nombre) + 1).toString();
          this.fieldsService.updateField(this.lastIndexReq);
        }
        this.notifyService.newNotification(
          "success",
          "Se han actualizado los valores"
        );
        this.router.navigate(["/property/" + response["id"]])
      }
    } catch (err) {
      this.notifyService.newNotification(
        "danger",
        "Error actualizando legajo " + err
      );
    }
  };

  validateAllFormFields(formGroup: FormGroup) {
    //{1}
    // console.log(formGroup);

    Object.keys(formGroup.controls).forEach(field => {
      //{2}
      const control = formGroup.get(field); //{3}
      if (control instanceof FormControl) {
        //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        //{5}
        this.validateAllFormFields(control); //{6}
      }
    });
  }
}
