import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { TestConnectionState } from 'src/app/test-connection/store/states';

import { MlWekaService } from 'src/app/services/ml-weka-service';
import { selectDataset } from '../state-controllers/dataset-controller/selectors/dataset.selectors';
import { DatasetState } from '../state-controllers/dataset-controller/states';
import { WekaMLActions } from '../state-controllers/weka-machine-learning-controller/actions';
import { getResultMetrics } from '../state-controllers/weka-machine-learning-controller/selectors/weka-ml.selectors';
@Component({
  selector: 'app-machine-learning',
  templateUrl: './machine-learning.component.html',
  styleUrls: ['./machine-learning.component.css']
})
export class MachineLearningComponent {
  apiUrl: string;
  httpClient: HttpClient;
  
  algorithmCategory: any;
  algorithms: any;
  selectedAlgorithmId: any;
  datasetId: any;
  results: any;
  formFields: any;
  formData: any;

  constructor(httpClient: HttpClient,
    private testConnectionStore: Store<TestConnectionState>,
    private datasetStore: Store<DatasetState>,
    private mlWekaService: MlWekaService,
    private mlWekaStore: Store
    ) {
      this.apiUrl = 'http://127.0.0.1:5000/'
      this.httpClient = httpClient;
  }

  regression_algorithms$ = [
    {id: "linear regression", name: "Linear Regression"}, 
    {id: "decision trees", name: "Decision Trees"},
    {id: "knn", name: "K-Nearest Neighbours (KNN)"},
    {id: "random forests", name: "Random Forests"},
    {id: "svm", name: "Support Vector Machines (SVM)"},
  ]
  // TODO: get available algorithms
  // regression_algorithms$ = this.httpClient
  //   .get<any>(this.apiUrl + '/algorithms' + '?category=regression', this.getHttpHeader())
  //   .pipe(map(response => response.message))

  classification_algorithms$ = [
    {id: 54321, name: "(empty)"},
  ]
  // classification_algorithms$ = this.httpClient
  //   .get<any>(this.apiUrl + '/algorithms' + '?category=classification', this.getHttpHeader())
  //   .pipe(map(response => response.message))

  dataset$ = this.datasetStore.select(selectDataset);
  
  sink = this.dataset$.subscribe((data) =>{
    this.datasetId = data._id
  })

  onSubmit(){}

  selectCategory(){
    if(this.algorithmCategory == "Classification"){
      this.algorithms = this.classification_algorithms$;
    } else{
      this.algorithms = this.regression_algorithms$;
    }
  }

  algorithmChange(){
    this.results = null;

    if(this.selectedAlgorithmId == "knn"){
      this.formFields = [
        { label: 'No. of Neighbours', type: 'text', name: 'neighbours_count', value: '', required: true },
      ];
      this.formData = {
        'neighbours_count': 8
      }
    } else {
      this.formFields = [];
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
    const selectedAttributes = this.attributes
      .filter(attribute => attribute.selected == true)
      .map(attribute => attribute.name)

    this.mlWekaStore.dispatch(WekaMLActions.wekaMLAlgoInit({dataset_id: this.datasetId, algo: this.selectedAlgorithmId, selected_attributes: selectedAttributes}))
    this.mlWekaStore.select(getResultMetrics).subscribe((results) =>{
      console.log(results)
      this.results = results.data
    })
  }



  ///////////  LINEAR REGRESSION  //////////////


  sampleAttributes: Attribute[] = [
    { name: 'SMOKING', selected: true },
    { name: 'OBESITY', selected: false},
  ]

  attributes: Attribute[] = [];

  sink2 = this.dataset$.pipe(
    map(data => data.attributes)
  ).subscribe((attributes) =>{
    this.attributes = []
    attributes.forEach((attribute: any) =>{
        this.attributes.push({name: attribute, selected: false}) 
      })  
    console.log(this.attributes)
  })

  allSelected: boolean = false;

  updateAllSelected() {
    this.allSelected = this.attributes.every(a => a.selected);
  }

  someSelected(): boolean {
    return this.attributes.filter(a => a.selected).length > 0 && !this.allSelected;
    
  }

  setAll(selected: boolean) {
    this.allSelected = selected;
    this.attributes.forEach(a => (a.selected = selected));
  }
}

export interface Attribute {
  name: string;
  selected: boolean;
}