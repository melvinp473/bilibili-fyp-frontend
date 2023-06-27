import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable, map } from 'rxjs';
import { TestConnectionState } from 'src/app/test-connection/store/states';
import { DatasetState } from '../state-controllers/dataset-controller/states';
import { DatasetActions } from '../state-controllers/dataset-controller/actions';
import { DatasetService } from 'src/app/services/dataset-service';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css']
})
export class DatasetComponent {
  apiUrl: string;
  httpClient: HttpClient;

  datasetName: any;
  uploadedFile!: FormData;

  constructor(httpClient: HttpClient,
    private testConnectionStore: Store<TestConnectionState>,
    private datasetStore: Store<DatasetState>,
    private datasetService: DatasetService
    ) {
      this.apiUrl = 'http://127.0.0.1:5000/'
      this.httpClient = httpClient;
  }

  columnDefs: ColDef[] = [
    { 
      headerName: "Name",
      field: 'name' 
    },
    { 
      headerName: "Date Uploaded",
      field: 'create_date' 
    },
    { 
      headerName: "Last Updated",
      field: 'update_date' 
    },
    { 
      headerName: "MongoDB ID",
      field: '_id' 
    },
  ];

   // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  // Data that gets displayed in the grid
  public rowData$!: Observable<any[]>;

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  // Example load data from server
  onGridReady(params: GridReadyEvent) {
    const request_body = {
      user_id: "6435575578b04a2b1549c17b"
    }
    // this.rowData$ = this.httpClient
    //   .post<any>(this.apiUrl + '/get-dataset', request_body, this.getHttpHeader())
    //   .pipe(map(response => response.data))

    this.rowData$ = this.datasetService.getResponseDataset("6435575578b04a2b1549c17b")
    .pipe(map(response => response.data)) 
  }

  // Example of consuming Grid Event
  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
    const data = e.data
    //TODO: dataset id
    // this.store.dispatch(DatasetActions.loadSelectedDatasetId({dataset: data}))
    this.datasetStore.dispatch(DatasetActions.loadSelectedDatasetInit({ data: data }))
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }


  public getHttpHeader() {
    console.log("wwwd")
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return httpOptions;
  }

  upload(){
    console.log(this.uploadedFile)
  }

  onFileSelected(event:any){
    const file:File = event.target.files[0];
    if (file){
      console.log(file)
      this.datasetName = file.name;
      this.uploadedFile = new FormData();
      this.uploadedFile.append('dataset', file);
      this.uploadedFile.append('user_id', '6435575578b04a2b1549c17b')
      this.httpClient.post<any>(this.apiUrl + '/upload-dataset', this.uploadedFile, this.getHttpHeader())
      const upload$ = this.httpClient.post(this.apiUrl + '/upload-dataset', this.uploadedFile);

            upload$.subscribe();
    }
  }

}
