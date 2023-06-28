import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";



@Injectable({providedIn: "root"})
export class DatasetService {

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
    
    public getResponseDataset(id_user: any){
        const url = this.apiUrl + '/get-dataset'
        const request_body = {
            user_id: id_user
          }

        return this.httpClient.post<any>(
          url,
          request_body,
          this.getHttpHeader()
        )
        
    }

    public upload(file: FormData) {
        const url = this.apiUrl + '/upload-dataset'
        // const FormData = {
        //     dataset_file: file
        //   }

        return this.httpClient.post<any>(
          url,
          file,
          // this.getHttpHeader()
        )
        
    }

}