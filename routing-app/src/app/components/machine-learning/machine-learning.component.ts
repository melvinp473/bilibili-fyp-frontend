import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TestConnectionState } from 'src/app/test-connection/store/states';
@Component({
  selector: 'app-machine-learning',
  templateUrl: './machine-learning.component.html',
  styleUrls: ['./machine-learning.component.css']
})
export class MachineLearningComponent {
  algorithmCategory: any;
  algorithms: any;
  selectedAlgorithmId: any;
  apiUrl: string;
  httpClient: HttpClient;

  constructor(httpClient: HttpClient,
    private testConnectionStore: Store<TestConnectionState>
    ) {
      this.apiUrl = 'http://127.0.0.1:5000/'
      this.httpClient = httpClient;
  }

  regression_algorithms$ = [
    {id: 12345, name: "Linear Regression"}, 
    {id: 23456, name: "Multiple Linear Regression"}, 
    {id: 5678, name: "SMO Regression"}
  ]
  // TODO: get available algorithms
  // regression_algorithms$ = this.httpClient
  //   .get<any>(this.apiUrl + '/algorithms' + '?category=regression', this.getHttpHeader())
  //   .pipe(map(response => response.message))

  classification_algorithms$ = [
    {id: 54321, name: "KNN"}, 
    {id: 65432, name: "Random Forest"}
  ]
  // classification_algorithms$ = this.httpClient
  //   .get<any>(this.apiUrl + '/algorithms' + '?category=classification', this.getHttpHeader())
  //   .pipe(map(response => response.message))

  // TODO: dataset id
  // datasetId$ = this.store.select(DataSetSelectors.selectId)

  selectCategory(){
    if(this.algorithmCategory == "Classification"){
      this.algorithms = this.regression_algorithms$;
    } else{
      this.algorithms = this.classification_algorithms$;
    }
  }

  public getHttpHeader() {
    console.log("wwwd")
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return httpOptions;
  }

  runAlgorithm(){
    alert("clicked")
    // console.log(this.datasetId$)
    console.log(this.selectedAlgorithmId)
    // TODO: run machine learning
    // const request_body = {
    //   dataset_id: this.datasetId$,
    //   algorithm_id: this.selectedAlgorithmId,
    // }
    // result = this.httpClient
    //   .post<any>(this.apiUrl + '/run-machine-learning', request_body, this.getHttpHeader())
    const url = this.apiUrl + '/machineLearning'
    console.log(url)
    const request_body = {dataset_id:"6435538178b04a2b1549b45e", algorithm_id: "ss"} 
    // console.log(this.selectedAlgorithmId)
    return this.httpClient.post(
      url,
      request_body,
      this.getHttpHeader()
    ).subscribe(x =>{console.log(x)}
    );
    

  }
}
