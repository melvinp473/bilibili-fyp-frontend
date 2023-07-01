import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { TestConnectionState } from 'src/app/test-connection/store/states';

import { MlWekaService } from 'src/app/services/ml-weka-service';
import { selectDataset } from '../state-controllers/dataset-controller/selectors/dataset.selectors';
import { DatasetState } from '../state-controllers/dataset-controller/states';
import { WekaMLActions } from '../state-controllers/weka-machine-learning-controller/actions';
import { getResultMetrics } from '../state-controllers/weka-machine-learning-controller/selectors/weka-ml.selectors';

export interface Variable {
  name: string;
  selected: boolean;
}
@Component({
  selector: 'app-machine-learning',
  templateUrl: './machine-learning.component.html',
  styleUrls: ['./machine-learning.component.css'],
})
export class MachineLearningComponent {
  apiUrl: string;
  httpClient: HttpClient;

  datasetId: any;
  user_id = '6435575578b04a2b1549c17b';
  selectedAlgoId: any;
  selectedAlgoName: any;
  results: any;
  algoParamsFormData: any;

  targetVariable: any;
  independentVariables: Variable[] = [];

  constructor(
    httpClient: HttpClient,
    private testConnectionStore: Store<TestConnectionState>,
    private datasetStore: Store<DatasetState>,
    private mlWekaService: MlWekaService,
    private mlWekaStore: Store
  ) {
    this.apiUrl = 'http://127.0.0.1:5000/';
    this.httpClient = httpClient;
  }

  dataset$ = this.datasetStore.select(selectDataset);

  sink = this.dataset$.subscribe((data) => {
    this.datasetId = data._id;
  });

  resultLogForm = new FormGroup({
    runName: new FormControl(''),
  });

  runAlgorithm() {
    const selectedIndependentVariables = this.independentVariables
      .filter((variable) => variable.selected == true)
      .map((variable) => variable.name);

    const request_params = {
      DATASET_ID: this.datasetId,
      user_id: this.user_id,
      algo_type: this.selectedAlgoId,
      target_variable: this.targetVariable,
      independent_variables: selectedIndependentVariables,
      algo_params: {...this.algoParamsFormData},
      result_logging: { ...this.resultLogForm.value },
    };
    
    console.log(request_params)

    this.mlWekaStore.dispatch(
      WekaMLActions.wekaMLAlgoInit({
        request_params: request_params,
      })
    );
    this.mlWekaStore.select(getResultMetrics).subscribe((results) => {
      console.log(results);
      this.results = results.data;
    });
  }

  onSelectTarget() {
    this.independentVariables = []
    this.variables
      .filter((a) => a != this.targetVariable)
      .forEach((variable: any) => {
        this.independentVariables.push({
          name: variable,
          selected: false,
        });
      });
  }

  variables: any[] = [];

  sink2 = this.dataset$
    .pipe(map((data) => data.attributes))
    .subscribe((variables) => {
      this.variables = variables;
    });

  allSelected: boolean = false;

  updateAllSelected() {
    this.allSelected = this.independentVariables.every((a) => a.selected);
  }

  someSelected(): boolean {
    return (
      this.independentVariables.filter((a) => a.selected).length > 0 && !this.allSelected
    );
  }

  setAll(selected: boolean) {
    this.allSelected = selected;
    this.independentVariables.forEach((a) => (a.selected = selected));
  }

  onSelectAlgo(displayValue: string, algoId:string){
    this.selectedAlgoId = algoId
    this.selectedAlgoName = displayValue

    this.algoParamsFormData = null;

    this.results = null;
  }

  onParamsChange(newValue: any){
    this.algoParamsFormData = newValue
    console.log(this.algoParamsFormData)
  }
}

