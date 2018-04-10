import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Property } from '../../../models/property';

@Component({
  selector: 'app-cc-tc2',
  templateUrl: './cc-tc2.component.html',
  styleUrls: ['./cc-tc2.component.css']
})
export class CcTc2Component implements OnInit {
  @Input() propiedad : Property;
  @Output() updateProperty = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

}
