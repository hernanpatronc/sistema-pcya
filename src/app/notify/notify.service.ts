import { Injectable } from '@angular/core';

@Injectable()
export class NotifyService {

  constructor() { }

  notificationList = [];
  marginTop = 0;

  newNotification = (type : string, text : string) => {
    this.marginTop += 80;
    const newNotification = {
      text : text,
      type : type,
      marginTop : this.marginTop,
      class : "create"
    }
    this.notificationList.push(newNotification);
    //const index = this.notificationList.length;
    setTimeout(()=>{
      this.notificationList[0].class = "destroy";
      this.marginTop -= 80;
      setTimeout(()=>{
        this.notificationList.splice(0,1);
      },1000);
    }, 4000)
  }

}
