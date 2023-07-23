import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { selectDataset, selectFeatures } from '../state-controllers/dataset-controller/selectors/dataset.selectors';
import { DatasetState } from '../state-controllers/dataset-controller/states';
import { WekaMLActions } from '../state-controllers/weka-machine-learning-controller/actions';
import { getResultMetrics } from '../state-controllers/weka-machine-learning-controller/selectors/weka-ml.selectors';
import { MatDialog } from '@angular/material/dialog';
import { WarningPopupComponent } from '../machine-learning/warning-popup/warning-popup.component';
import { SubSink } from 'subsink';

export interface Variable {
  name: string;
  selected: boolean;
}
@Component({
  selector: 'app-machine-learning',
  templateUrl: './machine-learning.component.html',
  styleUrls: ['./machine-learning.component.css'],
})
export class MachineLearningComponent implements OnInit{
  apiUrl: string;
  httpClient: HttpClient;
  rfcPlot: string | null = null;
  dispPlot: string | null = null;
  cmPlot: string | null = null;

  dataset$ = this.datasetStore.select(selectDataset);
  features$ = this.datasetStore.select(selectFeatures);
  mlWekaStore$ = this.mlWekaStore.select(getResultMetrics);

  datasetId: any;
  datasetName: any;
  user_id = '6435575578b04a2b1549c17b';
  selectedAlgoName: any;
  results: any;
  algoParamsFormData: any;

  independentVariables: Variable[] = [];

  variables: any[] = [];
  allSelected: boolean = false;

  mainForm!: FormGroup;
  resultLogForm = new FormGroup({
    save_results: new FormControl(''),
    runName: new FormControl(''),
  });

  private subs = new SubSink();

  constructor(
    httpClient: HttpClient,
    private datasetStore: Store<DatasetState>,
    private mlWekaStore: Store,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.apiUrl = 'http://127.0.0.1:5000/';
    this.httpClient = httpClient;
  }

  ngOnInit(){
    this.mainForm = this.formBuilder.group({
      dataset_id: ['', Validators.required],
      user_id: [this.user_id, Validators.required],
      algo_type: ['', Validators.required],
      target_variable: ['', Validators.required],
      independent_variables: ['',],
    });

    this.subs.sink = this.mlWekaStore$.subscribe((results) => {
      console.log(results);
      
      if(results.hasOwnProperty('error')){
        this.openWarningDialog(results.error)
      }

      this.results = results.data;
      this.rfcPlot = this.decodeAndDisplayImage(this.results.rfc_plot);
      this.dispPlot = this.decodeAndDisplayImage(this.results.disp_plot);
      this.cmPlot = this.decodeAndDisplayImage(this.results.cm_plot);

    });

    this.subs.sink = this.dataset$.subscribe((data) => {
      console.log(data)
      this.datasetId = data._id;
      this.mainForm.patchValue({dataset_id: data._id})
      this.datasetName = data.name;
      this.variables = data.attributes;
    });

    this.subs.sink = this.features$.subscribe((results) => {
      if (results != null && results.length != 0) {
        this.mainForm.patchValue({target_variable: results[0]})
        // console.log(results)
        // console.log(this.variables)
        const set2 = new Set(results)
        const diff = this.variables.filter(v => !set2.delete(v));
        // console.log(diff)
        diff
        .forEach((variable: any) => {
          this.independentVariables.push({
            name: variable,
            selected: false,
          });
        });

        results
        .slice(1)
        .forEach((variable: any) => {
          this.independentVariables.push({
            name: variable,
            selected: true,
          });
        });

        
      }
    })
  }

  runAlgorithm() {
    const selectedIndependentVariables = this.independentVariables
      .filter((variable) => variable.selected == true)
      .map((variable) => variable.name);

    const request_params = {
      DATASET_ID: this.mainForm.controls['dataset_id'].value,
      user_id: this.mainForm.controls['user_id'].value,
      algo_type: this.mainForm.controls['algo_type'].value,
      target_variable: this.mainForm.controls['target_variable'].value,
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
  }

  onSelectAlgo(displayValue: string, algoId:string){
    this.mainForm.patchValue({algo_type: algoId})
    this.selectedAlgoName = displayValue

    this.algoParamsFormData = null;

    this.results = null;
  }

  onSelectTarget() {
    this.independentVariables = []
    this.variables
      .filter((a) => a != this.mainForm.get("target_variable")?.value)
      .forEach((variable: any) => {
        this.independentVariables.push({
          name: variable,
          selected: false,
        });
      });
  }

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

  onParamsChange(newValue: any){
    this.algoParamsFormData = newValue
    console.log(this.algoParamsFormData)
  }

  decodeAndDisplayImage(encodedImage: string): string {
    const decodedImage = atob(encodedImage);
    const buffer = new Uint8Array(decodedImage.length);
    for (let i = 0; i < decodedImage.length; i++) {
      buffer[i] = decodedImage.charCodeAt(i);
    }
    const blob = new Blob([buffer], { type: 'image/png' });
    const url = URL.createObjectURL(blob);
    return url;
  }

  openWarningDialog(messaage: string): void {
    const dialogRef = this.dialog.open(WarningPopupComponent, {
      width: '500px',
      data: {
        title: 'Error',
        message: messaage,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('close');
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

