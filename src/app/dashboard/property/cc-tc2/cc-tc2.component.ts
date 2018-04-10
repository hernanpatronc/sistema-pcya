import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../../../models/property';

@Component({
  selector: 'app-cc-tc2',
  templateUrl: './cc-tc2.component.html',
  styleUrls: ['./cc-tc2.component.css']
})
export class CcTc2Component implements OnInit {
  @Input() propiedad : Property;
  constructor() { }

  ngOnInit() {
  }

}
