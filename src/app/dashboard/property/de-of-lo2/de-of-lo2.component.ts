import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../../../models/property';
import { PropiedadesService } from '../../../services/propiedades.service';

@Component({
  selector: 'app-de-of-lo2',
  templateUrl: './de-of-lo2.component.html',
  styleUrls: ['./de-of-lo2.component.css']
})
export class DeOfLo2Component implements OnInit {
  @Input() propiedad : Property;
  constructor(public propiedadesService : PropiedadesService) { }

  ngOnInit() {
  }

}
