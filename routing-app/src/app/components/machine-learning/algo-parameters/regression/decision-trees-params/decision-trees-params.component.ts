import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-regr-decision-trees-params',
  templateUrl: './decision-trees-params.component.html',
  styleUrls: ['./decision-trees-params.component.css']
})
export class DecisionTreesParamsComponent {
  @Output() valueChange = new EventEmitter<any>()

  paramsForm = new FormGroup({
    max_depth: new FormControl(10),
    min_samples_split: new FormControl(2),
    min_samples_leaf: new FormControl(1),
  });

  constructor() { }

  ngOnInit(){
    this.onChange()
    this.paramsForm.valueChanges.subscribe(() => {
      this.onChange()
    })
  }

  onChange(){
    this.valueChange.emit(this.paramsForm.getRawValue()) 
  }
}
