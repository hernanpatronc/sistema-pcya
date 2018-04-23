import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../../../models/property';
import { PropiedadesService } from '../../../services/propiedades.service';

@Component({
  selector: 'app-vu-cq-tu2',
  templateUrl: './vu-cq-tu2.component.html',
  styleUrls: ['./vu-cq-tu2.component.css']
})
export class VuCqTu2Component implements OnInit {
  @Input() propiedad : Property;
  constructor(private propiedadesService : PropiedadesService) { }

  ngOnInit() {
  }

}
