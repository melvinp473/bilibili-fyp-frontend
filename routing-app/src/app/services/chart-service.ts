import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";



@Injectable({providedIn: "root"})
export class ChartService {

    apiUrl: string;
    httpClient: HttpClient;

    constructor(httpClient: HttpClient) {
        this.apiUrl = 'http://127.0.0.1:5000/'
        this.httpClient = httpClient;
    }

    public getHttpHeader() {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
        return httpOptions;
    }
    
    public getResults(){
        const url = this.apiUrl + '/log-plot'
        const requestbody = {
            user_id: "user"
        }

        return this.httpClient.post<any>(
          url,
          requestbody,
          this.getHttpHeader()
        )
        
    }
}