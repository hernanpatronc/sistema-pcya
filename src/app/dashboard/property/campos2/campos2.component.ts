import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Property } from '../../../models/property';
import { PropiedadesService } from '../../../services/propiedades.service';

@Component({
  selector: 'app-campos2',
  templateUrl: './campos2.component.html',
  styleUrls: ['./campos2.component.css']
})
export class Campos2Component implements OnInit {
  @Input() propiedad : Property;

  constructor(public propiedadesService : PropiedadesService) { }

  ngOnInit() {
  }

}
