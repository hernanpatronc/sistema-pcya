import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Property } from '../../../models/property';
import { PropiedadesService } from '../../../services/propiedades.service';

@Component({
  selector: 'app-cc-tc1',
  templateUrl: './cc-tc1.component.html',
  styleUrls: ['./cc-tc1.component.css']
})
export class CcTc1Component implements OnInit {
  @Input() propiedad : Property;

  constructor(public propiedadesService : PropiedadesService) { }

  ngOnInit() {
  }

}
