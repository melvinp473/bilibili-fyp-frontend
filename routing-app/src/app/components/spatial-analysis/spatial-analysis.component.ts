import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { WarningPopupComponent } from '../machine-learning/warning-popup/warning-popup.component';
import { SubSink } from 'subsink';
import { selectDataset, selectFeatures } from '../state-controllers/dataset-controller/selectors/dataset.selectors';
import { DatasetState } from '../state-controllers/dataset-controller/states';
import esriConfig from '@arcgis/core/config';
import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer';


import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Polygon from '@arcgis/core/geometry/Polygon';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import { SpatialAnalysisServices } from 'src/app/services/sa-services';


export interface Variable {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-spatial-analysis',
  templateUrl: './spatial-analysis.component.html',
  styleUrls: ['./spatial-analysis.component.css']
})
export class SpatialAnalysisComponent implements OnInit {
  apiUrl: string;
  httpClient: HttpClient;
  private subs = new SubSink();
  user_id = '6435575578b04a2b1549c17b';
  locationCode: any;
  displayName: any;
  mainForm!: FormGroup;
  dataset$ = this.datasetStore.select(selectDataset);
  datasetId: any;
  variables: any;
  results: any;
  save = false
  location_params: any = {
    locations_list : [
      {
        location_code: "AUS",
        // country_name: null,
      },
    ],
  }

  constructor(
    httpClient: HttpClient,
    private datasetStore: Store<DatasetState>,
    private mlWekaStore: Store,
    private dialog: MatDialog,
    private SAservice: SpatialAnalysisServices,
    private formBuilder: FormBuilder
  ) {
    this.apiUrl = 'http://127.0.0.1:5000/';
    this.httpClient = httpClient;
  }

  ngOnInit(): void {

    this.mainForm = this.formBuilder.group({

      dataset_id: ['', Validators.required],
      user_id: [this.user_id, Validators.required],
      area_level: ['counties', Validators.required],
      target_variable: ['', Validators.required],
      // year: [2016, Validators.required],
      // countries: ['', Validators.required],

    });

    this.subs.sink = this.dataset$.subscribe((data) => {
      console.log(data)
      this.datasetId = data._id;
      this.mainForm.patchValue({dataset_id: data._id})
      this.variables = data.attributes;
    });

    // esriConfig.apiKey = "AAPKec494d08b92e410a832aca68af6c08ccRwAYSa7l5iUVz_9786FInnz8CIBxsLUPLWXem0ePCii_h-ycfUmotzastMOAKwhP";

    // const vtlLayer = new VectorTileLayer({
    //   url: "https://vectortileservices3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Santa_Monica_Mountains_Parcels_VTL/VectorTileServer/"
    // });

    // const map = new Map({
    //   basemap: "arcgis-topographic", // Basemap layer service
    // })

    // const view = new MapView({
    //   map: map,
    //   center: [-118.805, 34.027], // Longitude, Latitude of Australia's center
    //   zoom: 13, 
    //   container: "viewDiv" // Div element
    // });
    // const graphicsLayer = new GraphicsLayer();
    // map.add(graphicsLayer);

    // const polygonGeometry = new Polygon({
    //   rings: [
    //     [
    //       [-118.818984489994, 34.0137559967283],
    //       [-118.806796597377, 34.0215816298725],
    //       [-118.791432890735, 34.0163883241613],
    //       [-118.79596686535, 34.008564864635],
    //       [-118.808558110679, 34.0035027131376]
    //     ]
    //   ]
    // });

    // const simpleFillSymbol = new SimpleFillSymbol({
    //   color: [227, 139, 79, 0.8],
    //   outline: {
    //     color: [255, 255, 255],
    //     width: 1
    //   }
    // });

    // const polygonGraphic = new Graphic({
    //   geometry: polygonGeometry,
    //   symbol: simpleFillSymbol
    // });
    // graphicsLayer.add(polygonGraphic);
  }

  // onSelectAlgo(locationName: string, code: string){
  //   this.locationCode = code
  //   this.displayName = locationName
  //   // this.algoParamsFormData = null;
  // }

  onParamsChange(i:number, event:any){
    this.location_params.locations_list[i].location_code = event.value
    // this.countries_params.countries_list[i].country_name = {}
  }

  addLocations(){
    this.location_params.locations_list.push({
      location_code: null,
      // country_name: null,
    })
  }

  deleteCountries(index: number){
    this.location_params.locations_list.splice(index, 1)
  }

  runAnalysis(){
    const request_params = {
      DATASET_ID: this.mainForm.controls['dataset_id'].value,
      user_id: this.mainForm.controls['user_id'].value,
      target_variable: this.mainForm.controls['target_variable'].value,
      area_level: this.mainForm.controls['area_level'].value,
      // year: this.mainForm.controls['year'].value,
      request_type: "SA",
      countries_params: {...this.location_params},
    };
    console.log(request_params)
    this.SAservice.runSA(request_params)
    .subscribe(response => {
      this.results = [response.graph]
      this.save = true
    })
    
  }

  saveResults(){
    const request_params = {
      DATASET_ID: this.mainForm.controls['dataset_id'].value,
      user_id: this.mainForm.controls['user_id'].value,
      request_type: "save",
      results: this.results,
    };
    console.log(request_params)
    this.SAservice.saveReults(request_params)
    .subscribe(response => {
    })
    
  }
}
