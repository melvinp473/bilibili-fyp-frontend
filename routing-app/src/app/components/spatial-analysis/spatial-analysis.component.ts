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
  mainForm!: FormGroup;
  resultLogForm = new FormGroup({
    save_results: new FormControl(''),
    runName: new FormControl(''),
  });

  constructor(
    httpClient: HttpClient,
    private datasetStore: Store<DatasetState>,
    private mlWekaStore: Store,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.apiUrl = 'http://127.0.0.1:5000/';
    this.httpClient = httpClient;
  }

  ngOnInit(): void {
    esriConfig.apiKey = "AAPKec494d08b92e410a832aca68af6c08ccRwAYSa7l5iUVz_9786FInnz8CIBxsLUPLWXem0ePCii_h-ycfUmotzastMOAKwhP";

    const vtlLayer = new VectorTileLayer({
      url: "https://vectortileservices3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Santa_Monica_Mountains_Parcels_VTL/VectorTileServer/"
    });

    const map = new Map({
      basemap: "arcgis-topographic", // Basemap layer service
    })

    const view = new MapView({
      map: map,
      center: [-118.805, 34.027], // Longitude, Latitude of Australia's center
      zoom: 13, 
      container: "viewDiv" // Div element
    });
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    const polygonGeometry = new Polygon({
      rings: [
        [
          [-118.818984489994, 34.0137559967283],
          [-118.806796597377, 34.0215816298725],
          [-118.791432890735, 34.0163883241613],
          [-118.79596686535, 34.008564864635],
          [-118.808558110679, 34.0035027131376]
        ]
      ]
    });

    const simpleFillSymbol = new SimpleFillSymbol({
      color: [227, 139, 79, 0.8],
      outline: {
        color: [255, 255, 255],
        width: 1
      }
    });

    const polygonGraphic = new Graphic({
      geometry: polygonGeometry,
      symbol: simpleFillSymbol
    });
    graphicsLayer.add(polygonGraphic);


  }
}
