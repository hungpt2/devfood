import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class HttpClient {

  constructor(private http: Http) {}

  createAuthorizationHeader(headers: Headers, key: string) {
    headers.append('Api-Key', key); 
  }

  get(key: any, url: any) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers, key);
    return this.http.get(url, {
      headers: headers
    });
  }

  post(key: any, url: any, data: any) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers, key);
    return this.http.post(url, data, {
      headers: headers
    });
  }
}
