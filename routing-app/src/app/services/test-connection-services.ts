
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { BasicApiResponseModel } from "../models/api-models/basic-response-model";
// import { Injectable } from "@angular/core";


// @Injectable({providedIn: "root"})
export class TestConnectionService<T> {

    apiUrl: string;
    httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.apiUrl = 'http://127.0.0.1:5000/'
        this.httpClient = httpClient;
    }

    public getHttpHeader() {
      console.log("www")
        const httpOptions = {
          headers: new HttpHeaders({
          })
        };
        return httpOptions;
    }
    
    public sendTest(data: string): Observable<BasicApiResponseModel<T>> {
        // const url = this.apiUrl + ApiConfig.FACEBOOK_FEED_PATH
        const url = this.apiUrl + "/connect"
        console.log(data)
        console.log(url)
        return this.httpClient.post<BasicApiResponseModel<T>>(
          url,
          data,
          this.getHttpHeader()
        );
        
    }




}