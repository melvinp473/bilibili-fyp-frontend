import { Component } from '@angular/core';
import { PreprocssingService } from 'src/app/services/preprocessing-services';
import { DatasetState } from '../../state-controllers/dataset-controller/states';
import { Store } from '@ngrx/store';
import { selectDataset } from '../../state-controllers/dataset-controller/selectors/dataset.selectors';

@Component({
  selector: 'app-feature-selection',
  templateUrl: './feature-selection.component.html',
  styleUrls: ['./feature-selection.component.css']
})
export class FeatureSelectionComponent {

  selectedPreprocessingMethodId: any;
  datasetId: any;

  selectedAlgoId: any;
  selectedAlgoName: any;
  algoParamsFormData: any;

  constructor(
    private datasetStore: Store<DatasetState>,
    private preprocessingService: PreprocssingService
    ) {
  }

  preprocessingMethods = [
    {id: "feature selection", name: "Feature Selection"},
  ]

  dataset$ = this.datasetStore.select(selectDataset);
  sink = this.dataset$.subscribe((data) =>{
    this.datasetId = data._id
  })

  onSelectAlgo(displayValue: string, algoId:string){
    this.selectedAlgoId = algoId
    this.selectedAlgoName = displayValue
    this.algoParamsFormData = null;
  }

  onParamsChange(newValue: any){
    this.algoParamsFormData = newValue
    console.log(this.algoParamsFormData)
  }


  runPreprocessing() {
    console.log('feature selection works')
  }

}
