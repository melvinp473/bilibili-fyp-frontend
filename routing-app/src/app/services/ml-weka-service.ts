
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";



@Injectable({providedIn: "root"})
export class MlWekaService {

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
    
    public runMlAlgorithm(request_params: any){
        const url = this.apiUrl + '/machine-learning'
        console.log(url)

        return this.httpClient.post<any>(
          url,
          request_params,
          this.getHttpHeader()
        )
        
    }




}