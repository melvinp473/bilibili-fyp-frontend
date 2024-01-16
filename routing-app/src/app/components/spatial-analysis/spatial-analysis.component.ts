import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { WarningPopupComponent } from '../machine-learning/warning-popup/warning-popup.component';
import { SubSink } from 'subsink';
import { selectDataset, selectFeatures } from '../state-controllers/dataset-controller/selectors/dataset.selectors';
import { DatasetState } from '../state-controllers/dataset-controller/states';

export interface Variable {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-spatial-analysis',
  templateUrl: './spatial-analysis.component.html',
  styleUrls: ['./spatial-analysis.component.css']
})
export class SpatialAnalysisComponent implements OnInit{
  apiUrl: string;
  httpClient: HttpClient;
  private subs = new SubSink();
  mainForm!: FormGroup;
  resultLogForm = new FormGroup({
    save_results: new FormControl(''),
    runName: new FormControl(''),
  });

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

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
