import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Files } from '../models/files';
import { ip } from '../config';

@Injectable()
export class FilesService {

  constructor(private http: HttpClient) { }

  getFiles(path: string): Promise<Files[]> {
    return this.http
      .get(ip + '/api/files?where={"path":"'+path+'"}')
      .toPromise()
      .then(response => {
        // console.log(response)
        return response as Files[];
      })
      .catch(this.handleError);
  }

  createFolder(path: string, foldername : string): Promise<any> {
    return this.http
      .post(ip + '/api/files', {
        originalFilename : foldername,
        isFolder : true,
        path : path
      })
      .toPromise()
      .then(response => {
        // console.log(response)
        return response;
      })
      .catch(this.handleError);
  }

  deleteFile = async (id: number) => {
    return this.http
      .delete(ip + '/api/files/' + id)
      .toPromise()
      .then(response => {
        // console.log(response)
        return response;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    //console.error("An error occurred", error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
