import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { DatasetState } from '../state-controllers/dataset-controller/states';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent {
  apiUrl: string;
  httpClient: HttpClient;
  
  selectedAnalysisMethodId: any;
  imageSrc: any;

  constructor(httpClient: HttpClient,
    private datasetStore: Store<DatasetState>
    ) {
      this.apiUrl = 'http://127.0.0.1:5000/'
      this.httpClient = httpClient;
  }

  analysisMethods = [
    {id: "correlation coefficient", name: "Correlation Coefficient"}, 
  ]

  public runAnalysis(){

    const url = this.apiUrl + '/analysis'
    console.log(url)
    const request_body = {
      // DATASET_ID: dataset_id, 
      // analysis_code: analysis_code,
    } 

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { /* Include any necessary request body data */ };
    this.httpClient.post(url, body, {
      headers: headers,
      responseType: 'blob',
      observe: 'response'
    }).subscribe((response: HttpResponse<Blob>) => {
      if (response.ok) {
        const blob = response.body;
        if (blob){
          this.imageSrc = URL.createObjectURL(blob);
        }
      }
    });
  }
}
