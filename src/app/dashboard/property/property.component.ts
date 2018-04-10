import { Component,state,style,animate,transition, trigger, keyframes, OnInit, OnDestroy, OnChanges } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Property } from '../../models/property';
import { PropiedadesService } from '../../services/propiedades.service';
import { FormsModule } from '@angular/forms';
import initNotify = require('../../../assets/js/notify.js');

@Component({
    moduleId: module.id,
    selector: 'prop-cmp',
    templateUrl: 'property.component.html',
    })

    export class PropertyComponent implements OnInit{ 
        constructor(private router : Router, private activatedRoute : ActivatedRoute, private propiedadesService:PropiedadesService){}
        legajo:string;
        
        propiedad = new Property();
        
        ngOnInit(){
            this.legajo = this.activatedRoute.snapshot.params['legajo'];
            if (this.legajo != "new"){
                this.propiedadesService.getProperty(this.legajo).then(propiedad => {
                    this.propiedad = propiedad[0];
                    // this.propiedad.FECHA = new Date(this.propiedad.FECHA);
                });

            }
                
        }
        
    }
