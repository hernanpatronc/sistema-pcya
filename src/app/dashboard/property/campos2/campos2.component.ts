import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../../../models/property';

@Component({
  selector: 'app-campos2',
  templateUrl: './campos2.component.html',
  styleUrls: ['./campos2.component.css']
})
export class Campos2Component implements OnInit {
  @Input() propiedad : Property;
  constructor() { }

  ngOnInit() {
  }

}
