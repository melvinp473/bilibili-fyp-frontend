import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-regr-bagging-params',
  templateUrl: './bagging-params.component.html',
  styleUrls: ['./bagging-params.component.css']
})
export class BaggingParamsComponent {
  @Output() valueChange = new EventEmitter<any>()

  paramsForm = new FormGroup({
    estimator: new FormControl(''),
    n_estimators: new FormControl(10),
    max_samples: new FormControl(1),
    max_features: new FormControl(1),
  });

  constructor() { }

  ngOnInit(){
    this.valueChange.emit(this.paramsForm.getRawValue())
  }

  onChange(){
    this.valueChange.emit(this.paramsForm.getRawValue()) 
  }
}
