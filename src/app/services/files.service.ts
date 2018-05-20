import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Files } from '../models/files';
import { ip } from '../config';

@Injectable()
export class FilesService {

  constructor(private http: HttpClient) { }

  getFiles(path: string): Promise<Files[]> {
    return this.http
      .get(ip + '/api/file?where={"path":"'+path+'"}')
      .toPromise()
      .then(response => {
        // console.log(response)
        return response as Files[];
      })
      .catch(this.handleError);
  }

  createFolder(path: string, foldername : string): Promise<any> {
    return this.http
      .post(ip + '/api/file', {
        filename : foldername,
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

  deleteFile = async (file : Files) => {
    return this.http
      .delete(ip + '/api/file?file={"completeFileName":"' + file.path + '/' + file.filename + '","isFolder":'+file.isFolder+'}')
      .toPromise()
      .then(response => {
        // console.log(response)
        return response;
      })
      .catch(this.handleError);
  }

  percentage = 0;
  postFile = async (formData : FormData) => {
    const req = new HttpRequest('POST', ip+'/api/file', formData, {
      reportProgress: true
    });
    return this.http.request(req).subscribe(event => {
      // Via this API, you get access to the raw event stream.
      // Look for upload progress events.
      if (event.type === HttpEventType.UploadProgress) {
        // This is an upload progress event. Compute and show the % done:
        this.percentage = Math.round(100 * event.loaded / event.total);
        // console.log(`File is ${percentDone}% uploaded.`);
      } else if (event instanceof HttpResponse) {
        // console.log('File is completely uploaded!');
        this.percentage = 0;
      }
    });
  }

  private handleError(error: any): Promise<any> {
    //console.error("An error occurred", error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
