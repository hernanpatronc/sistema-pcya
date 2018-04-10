import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../../../models/property';

@Component({
  selector: 'app-vu-cq-tu2',
  templateUrl: './vu-cq-tu2.component.html',
  styleUrls: ['./vu-cq-tu2.component.css']
})
export class VuCqTu2Component implements OnInit {
  @Input() propiedad : Property;
  constructor() { }

  ngOnInit() {
  }

}
