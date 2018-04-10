import { Component, OnInit, Input } from '@angular/core';
import { Property } from '../../../models/property';

@Component({
  selector: 'app-ot1',
  templateUrl: './ot1.component.html',
  styleUrls: ['./ot1.component.css']
})
export class Ot1Component implements OnInit {
  @Input() propiedad : Property;
  constructor() { }

  ngOnInit() {
  }

}
