import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-knn-params',
  templateUrl: './knn-params.component.html',
  styleUrls: ['./knn-params.component.css']
})
export class KnnParamsComponent {

  @Output() valueChange = new EventEmitter<any>()

  paramsForm = new FormGroup({
    n_neighbors: new FormControl(8),
    weights: new FormControl(''),
  });

  constructor() { }

  ngOnInit(){
    this.valueChange.emit(this.paramsForm.getRawValue())
  }

  onChange(){
    this.valueChange.emit(this.paramsForm.getRawValue()) 
  }
}
