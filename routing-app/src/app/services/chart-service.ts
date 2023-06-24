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
    
    public getResults(request_body: any){
        const url = this.apiUrl + '/get-results'

        return this.httpClient.post<any>(
          url,
          request_body,
          this.getHttpHeader()
        )
    }

    // delete(doc_ids: [string]){
    //   const url = this.apiUrl + '/delete-results'

    //     return this.httpClient.delete<any>(
    //       url,
    //       {
    //         doc_ids: doc_ids
    //       },
    //     )
    // }
}