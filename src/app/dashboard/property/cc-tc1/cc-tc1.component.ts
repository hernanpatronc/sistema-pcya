import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../../../models/property';

@Component({
  selector: 'app-cc-tc1',
  templateUrl: './cc-tc1.component.html',
  styleUrls: ['./cc-tc1.component.css']
})
export class CcTc1Component implements OnInit {
  @Input() propiedad : Property;
  constructor() { }

  ngOnInit() {
  }

}
