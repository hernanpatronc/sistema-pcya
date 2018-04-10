import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../../../models/property';

@Component({
  selector: 'app-de-of-lo1',
  templateUrl: './de-of-lo1.component.html',
  styleUrls: ['./de-of-lo1.component.css']
})
export class DeOfLo1Component implements OnInit {

  @Input() propiedad : Property;
  constructor() { }

  ngOnInit() {
  }

}
