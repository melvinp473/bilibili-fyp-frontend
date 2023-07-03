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

  paramsForm = new FormGroup({
    k_best: new FormControl(''),
    selection_type: new FormControl(''),
    target_attribute: new FormControl('')
  });

  constructor(
    private datasetStore: Store<DatasetState>,
  ) { 
    
  }

  ngOnInit(){
    this.datasetStore.select(selectDataset).subscribe((data) =>{
      this.dataset_attributes = data.attributes
      console.log(this.dataset_attributes)
    })
    this.onChange()
    this.paramsForm.valueChanges.subscribe(() => {
      this.onChange()
    })
  }



  onChange(){
    this.valueChange.emit(this.paramsForm.getRawValue()) 
  }
}
