import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({providedIn: "root"})
export class ConnectionService {

    apiUrl: string;
    httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.apiUrl = 'http://127.0.0.1:5000/'
        this.httpClient = httpClient;
    }

    public getHttpHeader() {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        };
        return httpOptions;
      }
    
    public sendTest(data: any) {
        // const url = this.apiUrl + ApiConfig.FACEBOOK_FEED_PATH
        const url = this.apiUrl
        return this.httpClient.post(
          url,
          data,
          this.getHttpHeader()
        );
    }




}
