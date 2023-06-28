import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { map } from 'rxjs';
import { DatasetState } from '../state-controllers/dataset-controller/states';
import { selectDataset } from '../state-controllers/dataset-controller/selectors/dataset.selectors';
import { Store } from '@ngrx/store';
import { PreprocssingService } from 'src/app/services/preprocessing-services';
@Component({
  selector: 'app-preprocessing',
  templateUrl: './preprocessing.component.html',
  styleUrls: ['./preprocessing.component.css']
})
export class PreprocessingComponent {
  apiUrl: string;
  httpClient: HttpClient;
  
  selectedPreprocessingMethodId: any;
  datasetId: any;

  private gridApi!: GridApi;
  columnApi: any;

  constructor(httpClient: HttpClient,
    private datasetStore: Store<DatasetState>,
    private preprocessingService: PreprocssingService
    ) {
      this.apiUrl = 'http://127.0.0.1:5000/'
      this.httpClient = httpClient;
  }

  preprocessingMethods = [
    {id: "mean imputation", name: "Mean Imputation"}, 
    {id: "median imputation", name: "Median Imputation"}, 
    {id: "standardization", name: "Standardization"},
    {id: "label encoding", name: "Label Encoding"},
  ]

  dataset$ = this.datasetStore.select(selectDataset);
  
  sink = this.dataset$.subscribe((data) =>{
    this.datasetId = data._id
  })

  columnDefs: ColDef[] = [
  ];

   // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  // Data that gets displayed in the grid
  public rowData: any;

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  // Example load data from server
  onGridReady(params: GridReadyEvent) {    
    this.gridApi! = params.api;
    this.columnApi = params.columnApi;

    const request_body = {
      user_id: "6435575578b04a2b1549c17b",
      DATASET_ID: this.datasetId
    }

    const responseData = this.preprocessingService.getResponseData("6435575578b04a2b1549c17b", this.datasetId).subscribe( list => {
      console.log(list)
      list = list.data
        const listItem = list[0]
        console.log(listItem)
        for (const key in listItem){
          this.columnDefs.push({
            headerName: key,
            field: key
          })
        }
        this.gridApi.setColumnDefs(this.columnDefs)
        this.rowData = list
    })

    // const responseData$ = this.httpClient
    //   .post<any>(this.apiUrl + '/get-data', request_body, this.getHttpHeader())
    //   .pipe(map(response => response.data))

    // responseData$.subscribe( list => {
    //   console.log(list)
    //     const listItem = list[0]
    //     console.log(listItem)
    //     for (const key in listItem){
    //       this.columnDefs.push({
    //         headerName: key,
    //         field: key
    //       })
    //     }
    //     this.gridApi.setColumnDefs(this.columnDefs)
    //     this.rowData = list
    // })
  }

  public getHttpHeader() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return httpOptions;
}

  public runPreProcessingService(dataset_id: string, preprocessing_code: string){
    const url = this.apiUrl + '/preprocessing'
    console.log(url)
    const request_body = {
      DATASET_ID: dataset_id, 
      preprocessing_code: preprocessing_code,
    } 

    console.log(request_body)
    const observer = this.httpClient.post<any>(
      url,
      request_body,
      this.getHttpHeader()
    )
    observer.subscribe()
  }

  public runPreprocessing(){
    // console.log('Run!')
    this.preprocessingService.runPreprocessing(this.datasetId, this.selectedPreprocessingMethodId).subscribe(
      (data) => {
        console.log(data.response)
        if (data.response) {
          this.preprocessingService.getResponseData("6435575578b04a2b1549c17b", this.datasetId).subscribe( list => {
            console.log(list)
            list = list.data
              const listItem = list[0]
              console.log(listItem)
              for (const key in listItem){
                this.columnDefs.push({
                  headerName: key,
                  field: key
                })
              }
              this.gridApi.setColumnDefs(this.columnDefs)
              this.rowData = list
          })
        }
        // if(new_data.data.length > 0) {
        //   // console.log(new_data)
        //   // console.log('done!')
        //   const list = new_data.data
        //   const listItem = list[0]
        //   console.log(listItem)
        //   for (const key in listItem){
        //     this.columnDefs.push({
        //       headerName: key,
        //       field: key
        //     })
        //   }
        //   this.gridApi.setColumnDefs(this.columnDefs)
        //   this.rowData = list
        // }
      }
    )
    // console.log('done!')

    // const responseData = this.preprocessingService.getResponseData("6435575578b04a2b1549c17b", this.datasetId).subscribe( list => {
    //   console.log(list)
    //   list = list.data
    //     const listItem = list[0]
    //     console.log(listItem)
    //     for (const key in listItem){
    //       this.columnDefs.push({
    //         headerName: key,
    //         field: key
    //       })
    //     }
    //     this.gridApi.setColumnDefs(this.columnDefs)
    //     this.rowData = list
    // })

  }

}
