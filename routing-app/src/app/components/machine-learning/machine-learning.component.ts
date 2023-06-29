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

  // algorithmCategory: any;
  // algorithms: any;
  datasetId: any;
  user_id = '6435575578b04a2b1549c17b';
  selectedAlgoId: any;
  selectedAlgoName: any;
  results: any;
  additionalParamsFormFields: any;
  additionalParamsFormData: any;

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

  // regression_algorithms$ = [
  //   { id: 'linear regression', name: 'Linear Regression' },
  //   { id: 'decision trees', name: 'Decision Trees' },
  //   { id: 'knn', name: 'K-Nearest Neighbours (KNN)' },
  //   { id: 'random forests', name: 'Random Forests' },
  //   { id: 'svm', name: 'Support Vector Machines (SVM)' },
  //   { id: 'ensemble', name: 'Ensemble' },
  // ];

  // classification_algorithms$ = [{ id: 54321, name: '(empty)' }];

  dataset$ = this.datasetStore.select(selectDataset);

  sink = this.dataset$.subscribe((data) => {
    this.datasetId = data._id;
  });

  resultLogForm = new FormGroup({
    runName: new FormControl(''),
  });

  // selectCategory() {
  //   if (this.algorithmCategory == 'Classification') {
  //     this.algorithms = this.classification_algorithms$;
  //   } else {
  //     this.algorithms = this.regression_algorithms$;
  //   }
  // }

  // algorithmChange() {
  //   this.results = null;

  //   if (this.selectedAlgoId == 'knn') {
  //     this.formFields = [
  //       {
  //         label: 'No. of Neighbours',
  //         type: 'number',
  //         name: 'neighbours_count',
  //         value: '',
  //         required: true,
  //       },
  //     ];
  //     this.formData = {
  //       neighbours_count: 8,
  //     };
  //   } else if (this.selectedAlgoId == 'decision trees') {
  //     this.formFields = [
  //       {
  //         label: 'Max Tree Depth',
  //         type: 'number',
  //         name: 'max_depth',
  //         value: '',
  //         required: true,
  //       },
  //     ];
  //     this.formData = {
  //       max_depth: 10,
  //     };
  //   } else {
  //     this.formFields = [];
  //   }
  // }

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
      additional_params: { ...this.additionalParamsFormData },
      result_logging: { ...this.resultLogForm.value },
    };

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
    console.log(displayValue)
    console.log(algoId)
    this.selectedAlgoId = algoId
    this.selectedAlgoName = displayValue

    // clear display of previous results
    this.results = null;

    // update algo specific parameters expansion
    if (this.selectedAlgoId == 'knn') {
      this.additionalParamsFormFields = [
        {
          label: 'No. of Neighbours',
          type: 'number',
          name: 'neighbours_count',
          min: 0,
          required: true,
        },
        {
          label: 'Weights (TODO: uniform or distance)',
          type: 'text',
          name: 'weights',
          required: true,
        },
      ];
      this.additionalParamsFormData = {
        neighbours_count: 8,
      };
    } else if (this.selectedAlgoId == 'decision trees') {
      this.additionalParamsFormFields = [
        {
          label: 'Max Tree Depth',
          type: 'number',
          name: 'max_depth',
          min: 0,
          required: true,
        },
        {
          label: 'Min number of samples to split an internal node',
          type: 'number',
          name: 'min_samples_split',
          min: 0,
          step: 0.01,
          required: true,
        },
        {
          label: 'Min number of samples in each leaf node',
          type: 'number',
          name: 'min_samples_leaf',
          min: 0,
          step: 0.01,
          required: true,
        },
        
      ];
      this.additionalParamsFormData = {
        max_depth: 10,
        min_samples_split: 2,
        min_samples_leaf: 1,
      };
    } else if (this.selectedAlgoId == 'bagging_regression') {
      this.additionalParamsFormFields = [
        {
          label: 'Estimator (TODO: let user choose one base regr algo)',
          type: 'text',
          name: 'estimator',
          required: true,
        },
        {
          label: 'No. of estimators',
          type: 'number',
          name: 'n_estimators',
          required: true,
        },
        {
          label: 'Max samples',
          type: 'number',
          name: 'max_samples',
          min: 0,
          step: 0.01,
          required: true,
        },
        {
          label: 'Max features',
          type: 'number',
          name: 'max_features',
          min: 0,
          step: 0.01,
          required: true,
        },
      ];
      this.additionalParamsFormData = {
        n_estimators: 10,
        max_samples: 1.0,
        max_features: 1.0,
      };
    } else if (this.selectedAlgoId == 'random_forest_regression') {
      this.additionalParamsFormFields = [
        {
          label: 'No. of estimators',
          type: 'number',
          name: 'n_estimators',
          required: true,
        },
        {
          label: 'Max depth',
          type: 'number',
          name: 'max_depth',
          required: false,
        },
      ];
      this.additionalParamsFormData = {
        n_estimators: 100,
        placeholder: 10,
      };
    } else if (this.selectedAlgoId == 'voting_regression') {
      this.additionalParamsFormFields = [
        {
          label: 'Placeholder',
          type: 'number',
          name: 'placeholder',
          value: '',
          required: false,
        },
      ];
      this.additionalParamsFormData = {
        placeholder: 10,
      };
    } else {
      this.additionalParamsFormFields = [];
    }
    console.log(this.additionalParamsFormData)
  }
}

