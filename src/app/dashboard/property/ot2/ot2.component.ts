import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../../../models/property';

@Component({
  selector: 'app-ot2',
  templateUrl: './ot2.component.html',
  styleUrls: ['./ot2.component.css']
})
export class Ot2Component implements OnInit {
  @Input() propiedad : Property;
  constructor() { }

  ngOnInit() {
  }

}
