import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Property } from '../../../models/property';

@Component({
  selector: 'app-campos1',
  templateUrl: './campos1.component.html',
  styleUrls: ['./campos1.component.css']
})
export class Campos1Component implements OnInit {
  @Input() propiedad: Property;
  @Output() updateProperty = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

}
