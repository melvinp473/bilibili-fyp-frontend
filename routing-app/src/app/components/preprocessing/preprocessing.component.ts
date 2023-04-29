import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { Observable, map } from 'rxjs';
@Component({
  selector: 'app-preprocessing',
  templateUrl: './preprocessing.component.html',
  styleUrls: ['./preprocessing.component.css']
})
export class PreprocessingComponent {
  apiUrl: string;
  httpClient: HttpClient;

  constructor(httpClient: HttpClient,
    ) {
      this.apiUrl = 'http://127.0.0.1:5000/'
      this.httpClient = httpClient;
  }

  columnDefs: ColDef[] = [
    // { 
    //   headerName: "Name",
    //   field: 'name' 
    // },
    // { 
    //   headerName: "Date Uploaded",
    //   field: 'create_date' 
    // },
    // { 
    //   headerName: "Last Updated",
    //   field: 'update_date' 
    // },
    // { 
    //   headerName: "MongoDB ID",
    //   field: '_id' 
    // },
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

  // TODO:
  // datasetId$ = this.store.select(DataSetSelectors.selectId)

  // Example load data from server
  onGridReady(params: GridReadyEvent) {
    // // get the data using dataset id
    // const responseData$ = this.httpClient
    //   .post<any>(this.apiUrl + '/getDataset', '{"user_id":'+' "' + this.datasetId$ + '"}', this.getHttpHeader())
    //   .pipe(map(response => response.message))

    // // create the coldefs
    // this.columnDefs = [];
    // responseData$.pipe(
    //   map(data => this.columnDefs.push(
    //     {
    //       headerName: data.
    //     }
    //   ))
    // )
    // for (data in responseData$){
    //   colDef: ColDef = {
    //     header: this
    //   }
    // }
    

    // assign the data to rowData$
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

}
