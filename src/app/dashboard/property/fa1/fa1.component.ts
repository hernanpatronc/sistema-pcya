import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../../../models/property';

@Component({
  selector: 'app-fa1',
  templateUrl: './fa1.component.html',
  styleUrls: ['./fa1.component.css']
})
export class Fa1Component implements OnInit {
  @Input() propiedad : Property;
  constructor() { }

  ngOnInit() {
  }

}
