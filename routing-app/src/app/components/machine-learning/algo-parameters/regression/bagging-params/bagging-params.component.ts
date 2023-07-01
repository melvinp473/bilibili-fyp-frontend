import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  chosenEstimator!: string;

  estimatorParamsData = {};

  constructor() { }

  ngOnInit(){
    this.onChange()
    this.paramsForm.valueChanges.subscribe(() => {
      this.onChange()
    })
  }

  onChange(){
    const allParamData = {
      ...this.paramsForm.getRawValue(),
      estimator_params: this.estimatorParamsData
    }
    this.valueChange.emit(allParamData) 
  }

  onEstimatorChange(){
    this.chosenEstimator = this.paramsForm.get('estimator')?.getRawValue()
  }

  onParamsChange(newValue: any){
    this.estimatorParamsData = newValue
    this.onChange()
  }
}
