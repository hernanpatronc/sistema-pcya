import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Property } from '../../../models/property';
import { PropiedadesService } from '../../../services/propiedades.service';

@Component({
  selector: 'app-campos1',
  templateUrl: './campos1.component.html',
  styleUrls: ['./campos1.component.css']
})
export class Campos1Component implements OnInit {
  @Input() propiedad: Property;

  constructor(private propiedadesService : PropiedadesService) { }

  ngOnInit() {
  }

}
