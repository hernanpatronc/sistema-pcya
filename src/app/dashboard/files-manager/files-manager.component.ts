import { Component, OnInit, ViewChild } from "@angular/core";
import { ContextMenuComponent } from "ngx-contextmenu";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import "rxjs/add/operator/switchMap";
import { Observable } from "rxjs/Observable";
import { Files } from "../../models/files";
import { FilesService } from "../../services/files.service";
import { NotifyService } from "../../notify/notify.service";
import { ip } from "../../config";
// import {ip} from
@Component({
  selector: "app-files-manager",
  templateUrl: "./files-manager.component.html",
  styleUrls: ["./files-manager.component.css"]
})
export class FilesManagerComponent implements OnInit {
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

  folders: Files[] = [];
  currentPath: string = "";
  ip = ip;
  selectedImage: Files = new Files();

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public filesService: FilesService,
    public notifyService: NotifyService
  ) {}

  async ngOnInit() {
    try {
      this.activatedRoute.queryParams.subscribe(async params => {
        // console.log(params); // {order: "popular"}
        this.currentPath = params.path ? params.path : "files";
        this.folders = await this.filesService.getFiles(this.currentPath);
      });
    } catch (err) {
      this.notifyService.newNotification("4", "Error buscando archivos " + err);
    }

    // console.log(this.activatedRoute)
  }

  deleteItem = () => {
    // console.log(folder)
    let folders = this.folders.filter((file, index, array) => {
      return file.selected;
    });
    if (folders.length == 0) {
      return alert("No has seleccionado ningun archivo");
    }
    for (let folder of folders) {
      this.filesService.deleteFile(folder);
      this.folders.splice(this.folders.indexOf(folder), 1);
    }
  };

  goToPath = async (path: string) => {
    this.currentPath = path;
    // this.router.navigate(['/files'], { queryParams: { path: this.currentPath + path } })
    try {
      this.folders = await this.filesService.getFiles(path);
    } catch (err) {
      this.notifyService.newNotification("4", "Error buscando archivos " + err);
    }
  };

  goToPrevious = async () => {
    let pathParts = this.currentPath.split("/");
    pathParts.length = pathParts.length - 1;
    this.currentPath = "";
    for (let pathPart of pathParts) {
      this.currentPath += pathPart + "/";
    }
    // console.log(this.currentPath);

    this.currentPath = this.currentPath.substring(
      0,
      this.currentPath.length - 1
    );
    // console.log(this.currentPath);

    this.goToPath(this.currentPath);
  };

  createFolder = async (foldername: string) => {
    await this.filesService.createFolder(this.currentPath, foldername);
    this.folders = await this.filesService.getFiles(this.currentPath);
  };

  async onFileChange(event) {
    let input = new FormData();
    input.append("isFolder", "false");
    input.append("path", this.currentPath);
    if (event.target.files.length > 0) {
      for (let file of event.target.files) {
        input.append("files", file, file.name);
      }
      await this.filesService.postFile(input);
      setTimeout(async ()=>{
        this.folders = await this.filesService.getFiles(this.currentPath);
      }, 1500)
      
    }
  }
}
