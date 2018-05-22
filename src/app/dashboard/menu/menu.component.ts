import { Component, OnInit } from '@angular/core';
import { ElectronService } from "ngx-electron";
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private _electronService : ElectronService, private rotuer : Router) { }

  ngOnInit() {
  }

  legajosClick = () => {
    if (!this._electronService.isElectronApp) {
      this.rotuer.navigate(['/files'], {queryParams : {path : "files"}})
    }
    else {
      this._electronService.ipcRenderer.send("open","\\\\10.10.10.19\\files");
    }
  }

}
