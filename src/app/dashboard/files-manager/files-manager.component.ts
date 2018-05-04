import { Component, OnInit, ViewChild } from '@angular/core';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-files-manager',
  templateUrl: './files-manager.component.html',
  styleUrls: ['./files-manager.component.css']
})
export class FilesManagerComponent implements OnInit {
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

  folders = [
    {
      active: false,
      title: "Fotos",
      path: "/fotos",
      isFolder: true
    },
    {
      active: false,
      title: "Ficha Tecnica",
      path: "/ficha",
      isFolder: false
    },
    {
      active: false,
      title: "Fotos 2",
      path: "/fotos",
      isFolder: true
    },
    {
      active: false,
      title: "Ficha Tecnica 2",
      path: "/ficha",
      isFolder: false
    },
    {
      active: false,
      title: "Fotos 3",
      path: "/fotos",
      isFolder: true
    },
    {
      active: false,
      title: "Ficha Tecnica 3",
      path: "/ficha",
      isFolder: false
    },
    {
      active: false,
      title: "Fotos 4",
      path: "/fotos",
      isFolder: true
    },
    {
      active: false,
      title: "Ficha Tecnica 4",
      path: "/ficha",
      isFolder: false
    },
    {
      active: false,
      title: "Fotos 5",
      path: "/fotos",
      isFolder: true
    },
    {
      active: false,
      title: "Ficha Tecnica 5",
      path: "/ficha",
      isFolder: false
    }
  ]
  currentPath : string = "";
  constructor(private activatedRoute : ActivatedRoute, private router : Router) { }

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      // console.log(params); // {order: "popular"}
      this.currentPath = params.path;
    });
    // console.log(this.activatedRoute)
  }

  deleteItem = (folder) => {
    // console.log(folder)
    this.folders.splice(this.folders.indexOf(folder),1)
  }

  goToPath = (path : string) => {
  this.router.navigate(['/files'], { queryParams: { path: this.currentPath + path } })
  }

}
