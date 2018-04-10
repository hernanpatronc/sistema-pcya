import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../../../models/property';

@Component({
  selector: 'app-fa2',
  templateUrl: './fa2.component.html',
  styleUrls: ['./fa2.component.css']
})
export class Fa2Component implements OnInit {
  @Input() propiedad : Property;
  constructor() { }

  ngOnInit() {
  }

}
