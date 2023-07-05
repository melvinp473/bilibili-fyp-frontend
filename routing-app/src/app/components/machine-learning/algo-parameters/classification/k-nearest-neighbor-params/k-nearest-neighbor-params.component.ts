import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cls-k-nearest-neighbor-params',
  templateUrl: './k-nearest-neighbor-params.component.html',
  styleUrls: ['./k-nearest-neighbor-params.component.css']
})
export class KNearestNeighborParamsComponent {

  @Output() valueChange = new EventEmitter<any>()

  paramsForm = new FormGroup({
    radius: new FormControl(0.2),
    weights: new FormControl(''),
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
