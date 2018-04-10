import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../../../models/property';

@Component({
  selector: 'app-vu-cq-tu1',
  templateUrl: './vu-cq-tu1.component.html',
  styleUrls: ['./vu-cq-tu1.component.css']
})
export class VuCqTu1Component implements OnInit {
  @Input() propiedad : Property;
  constructor() { }

  ngOnInit() {
  }

}
