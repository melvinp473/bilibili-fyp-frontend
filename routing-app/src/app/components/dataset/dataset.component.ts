import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable, map } from 'rxjs';
@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css']
})
export class DatasetComponent {
  apiUrl: string;
  httpClient: HttpClient;

  constructor(httpClient: HttpClient,
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
    this.rowData$ = this.httpClient
      .post<any>(this.apiUrl + '/getDataset', request_body, this.getHttpHeader())
      .pipe(map(response => response.message))
  }

  // Example of consuming Grid Event
  onCellClicked( e: CellClickedEvent): void {
    console.log('cellClicked', e);
    const data = e.data
    //TODO: dataset id
    // this.store.dispatch(DatasetActions.loadSelectedDatasetId({dataset: data}))
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }


  public getHttpHeader() {
    console.log("www")
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return httpOptions;
  }


  public getQueryTest(userId: string) {
    // const url = this.apiUrl + ApiConfig.FACEBOOK_FEED_PATH
    const url = this.apiUrl + '/getDataset'
    console.log(userId)
    console.log(url)
    return this.httpClient.post(
      url,
      userId,
      this.getHttpHeader()
    ).subscribe(x =>{console.log(x)}
    );
    
  }

  // refresh() {
  //   this.rowData$ = this.httpClient.post<any>(this.apiUrl + '/getDataset', '{"user_id": "6435575578b04a2b1549c17b"}', this.getHttpHeader())
  //   .pipe(map(response => response.message))
  // }

}
