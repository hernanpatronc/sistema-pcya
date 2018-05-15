import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NotifyService } from './notify.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css'],
  // animations: [
  //   trigger("notificationState", [
  //     state("active",style({
  //       top: "100",
  //       opacity: "1.0"
  //     })),
  //     state("inactive",style({
  //       top: "0",
  //       opacity: "0"
  //     })),
  //     transition('inactive => active', animate('1000ms ease-in')),
  //     transition('active => inactive', animate('1000ms ease-out'))
  //   ])
  // ]
})
export class NotifyComponent implements OnInit {
  @Input() alertType : string = "success";
  @Input() state : string = "create";
  @Input() top : number = 0;

  constructor(public notifyService : NotifyService) { }

  ngOnInit() {
  }

  closeNotification = () =>{
    this.notifyService.marginTop -= 80;
  }

}
