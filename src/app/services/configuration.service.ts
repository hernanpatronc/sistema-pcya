import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigurationService {
  ip : string = "http://localhost:1337";
  constructor(private http: HttpClient) { }
  setIp = async (ip : string) => {
    // await this.http.get('/assets/config/config.json')
    this.ip = ip;
  }
  getIp = () => {
    return this.ip;
  };
}
