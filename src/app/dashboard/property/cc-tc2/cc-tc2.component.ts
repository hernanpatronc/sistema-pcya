import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Property } from '../../../models/property';
import { PropiedadesService } from '../../../services/propiedades.service';

@Component({
  selector: 'app-cc-tc2',
  templateUrl: './cc-tc2.component.html',
  styleUrls: ['./cc-tc2.component.css']
})
export class CcTc2Component implements OnInit {
  @Input() propiedad : Property;

  constructor(public propiedadesService : PropiedadesService) { }

  ngOnInit() {
  }

}
