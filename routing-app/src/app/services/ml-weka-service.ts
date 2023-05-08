
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
    
    public runMlAlgorithm(dataset_id: string){
        const url = this.apiUrl + '/machineLearning'
        console.log(url)
        const request_body = {dataset_id: dataset_id, algorithm_id: "ss"} 

        return this.httpClient.post(
          url,
          request_body,
          this.getHttpHeader()
        ).subscribe(x =>{console.log(x)}
        );
        
    }




}