
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
    
    public runMlAlgorithm(dataset_id: string, algorithm_code: string, selected_attributes: string[]){
        const url = this.apiUrl + '/machine-learning'
        console.log(url)
        const request_body = {DATASET_ID: dataset_id, algo_type: algorithm_code, selected_attributes: selected_attributes} 

        return this.httpClient.post<any>(
          url,
          request_body,
          this.getHttpHeader()
        )
        
    }




}