import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-regr-random-forest-params',
  templateUrl: './random-forest-params.component.html',
  styleUrls: ['./random-forest-params.component.css']
})
export class RandomForestParamsComponent {

  @Output() valueChange = new EventEmitter<any>()

  paramsForm = new FormGroup({
    n_estimators: new FormControl(100),
    max_depth: new FormControl(10),
    min_samples_split: new FormControl(2),
    min_samples_leaf: new FormControl(1),
    min_weight_fraction_leaf: new FormControl(0),   
  });

  constructor() { }

  ngOnInit(){
    this.valueChange.emit(this.paramsForm.getRawValue())
  }

  onChange(){
    this.valueChange.emit(this.paramsForm.getRawValue()) 
  }
}
