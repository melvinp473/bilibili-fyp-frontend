import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DatasetState } from '../state-controllers/dataset-controller/states';
import { selectDataset } from '../state-controllers/dataset-controller/selectors/dataset.selectors';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit{
  apiUrl: string;
  httpClient: HttpClient;
  
  selectedAnalysisMethodId: any;
  imageSrc: any;
  datasetId: any;

  analysisMethods = [
    {id: "correlation coefficient", name: "Correlation Coefficient"}, 
  ]

  dataset$ = this.datasetStore.select(selectDataset);

  constructor(httpClient: HttpClient,
    private datasetStore: Store<DatasetState>
    ) {
      this.apiUrl = 'http://127.0.0.1:5000/'
      this.httpClient = httpClient;
  }

  ngOnInit(){
    this.dataset$.subscribe((data) => {
      this.datasetId = data._id;
    });
  }

  public runAnalysis(){

    const url = this.apiUrl + '/analysis'
    const body = {
      DATASET_ID: this.datasetId, 
      analysis_code: this.selectedAnalysisMethodId,
    } 

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
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
