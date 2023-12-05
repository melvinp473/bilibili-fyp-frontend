import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectDataset } from 'src/app/components/state-controllers/dataset-controller/selectors/dataset.selectors';
import { DatasetState } from 'src/app/components/state-controllers/dataset-controller/states';
import { PreprocssingService } from 'src/app/services/preprocessing-services';

@Component({
  selector: 'app-select-k-best',
  templateUrl: './select-k-best.component.html',
  styleUrls: ['./select-k-best.component.css']
})
export class SelectKBestComponent {
  @Output() valueChange = new EventEmitter<any>()
  dataset_attributes: any;
  max_length: any
  is_regression = false;
  is_classification = true;

  paramsForm = new FormGroup({
    k_best: new FormControl(5),
    selection_type: new FormControl('mutual_info_classif'),
    target_attribute: new FormControl(''),
    model: new FormControl('classification')
  });

  constructor(
    private datasetStore: Store<DatasetState>,
  ) { 
    
  }

  ngOnInit(){
    this.datasetStore.select(selectDataset).subscribe((data) =>{
      this.dataset_attributes = data.attributes
      this.max_length = this.dataset_attributes.length - 1
      // console.log(this.dataset_attributes)
    })
    this.onChange()
    this.paramsForm.valueChanges.subscribe(() => {
      this.onChange()
    })
  }

  changeOptions(formData: any) {
    console.log(formData)
    if (formData == "regression") {
      this.is_regression = true
      this.is_classification = false
    }

    else if (formData == "classification") {
      this.is_regression = false
      this.is_classification = true
    }
  }


  onChange(){
    this.changeOptions(this.paramsForm.getRawValue()['model'])
    this.valueChange.emit(this.paramsForm.getRawValue()) 
  }
}
