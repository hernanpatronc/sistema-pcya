import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../../../models/property';
import { PropiedadesService } from '../../../services/propiedades.service';

@Component({
  selector: 'app-de-of-lo1',
  templateUrl: './de-of-lo1.component.html',
  styleUrls: ['./de-of-lo1.component.css']
})
export class DeOfLo1Component implements OnInit {

  @Input() propiedad : Property;
  constructor(private propiedadesService : PropiedadesService) { }

  ngOnInit() {
  }

}
