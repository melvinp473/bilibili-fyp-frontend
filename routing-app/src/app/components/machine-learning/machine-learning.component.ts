import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-machine-learning',
  templateUrl: './machine-learning.component.html',
  styleUrls: ['./machine-learning.component.css']
})
export class MachineLearningComponent {
  algorithmCategory: any;
  algorithms: any;
  selectedAlgorithmId: any;

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
  }
}
