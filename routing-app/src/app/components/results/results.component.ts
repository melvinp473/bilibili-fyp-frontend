import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Chart } from 'chart.js/auto';
import { Observable, map } from 'rxjs';

import { ChartService } from 'src/app/services/chart-service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  apiUrl: string;
  httpClient: HttpClient;
  
  private gridApi!: GridApi;
  columnApi: any;

  data: any[] = [];
  linear_data: any[] = []
  svm_data: any[]  = []
  knn_data: any[]  = []
  tree_data: any[]  = []
  chart: any;
  selected_data: any[] = [];

  constructor(httpClient: HttpClient,
    private chartService: ChartService
  ) {
    this.apiUrl = 'http://127.0.0.1:5000/'
    this.httpClient = httpClient;
  }

  columnDefs: ColDef[] = [
    { 
      checkboxSelection: true 
    },
    { 
      headerName: "MongoDB Document ID",
      field: '_id' 
    },
    { 
      headerName: "ML Algorithm",
      field: 'algo_type' 
    },
    { 
      headerName: "Run Name",
      field: 'run_name' 
    },
    { 
      headerName: "Run ID",
      field: 'run_id' 
    },
    { 
      headerName: "Created Date",
      field: 'create_date' 
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

  ngOnInit() {

    this.chartService.getResults().subscribe((results) => {
      this.data = results.data
      // console.log(this.data)
      // console.log(results.data[0].algo_type)
    //   this.data.forEach( (item: any) => {
    //     if (item.algo_type == 'linear regression') {
    //       this.linear_data.push(item)
    //     }
    //     else if (item.algo_type == 'knn') {
    //       this.knn_data.push(item)
    //     }
    //     else if (item.algo_type == 'decision trees') {
    //       this.tree_data.push(item)
    //     }
    //     else if (item.algo_type == 'svm') {
    //       this.svm_data.push(item)
    //     }
    // })
    //   console.log(this.linear_data)
    //   console.log(this.knn_data)
    //   console.log(this.svm_data)
    //   console.log(this.tree_data)
    //   const test_data = [this.linear_data.pop(), this.knn_data.pop(), this.svm_data.pop(), this.tree_data.pop()]
    //   console.log(test_data)


    //   this.chart = new Chart('canvas', {
    //   type: 'bar',
    //   data: {
    //     labels: test_data.map(row => row.algo_type),
    //     datasets:[
    //       {
    //         label:'r2 score',
    //         data: test_data.map(row => row.metrics.r2_score)
    //       },
    //       {
    //         label:'mae',
    //         data: test_data.map(row => row.metrics.mae)
    //       },
    //       {
    //         label:'mse',
    //         data: test_data.map(row => row.metrics.mse)
    //       },
    //       {
    //         label:'mean absolute percentage',
    //         data: test_data.map(row => row.metrics.mean_absolute_percentage)
    //       },
    //       {
    //         label:'median absolute',
    //         data: test_data.map(row => row.metrics.media_absolute)
    //       },
    //       {
    //         label:'max error',
    //         data: test_data.map(row => row.metrics.max_error)
    //       },
    //     ]
    //     }
    // })
    })
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi! = params.api;
    this.columnApi = params.columnApi;

    const request_body = {
      user_id: "user_LYJ"
    }
    this.rowData$ = this.httpClient
      .post<any>(this.apiUrl + '/get-results', request_body, this.getHttpHeader())
      .pipe(map(response => response.data))
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

  public plotGraph(selected_data: any[]) {
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: selected_data.map(row => row.tag + " (" + row.run_id + ")"),
        datasets:[
          {
            label:'r2 score',
            data: selected_data.map(row => row.metrics.r2_score)
          },
          {
            label:'mae',
            data: selected_data.map(row => row.metrics.mae)
          },
          {
            label:'mse',
            data: selected_data.map(row => row.metrics.mse)
          },
          {
            label:'mean absolute percentage',
            data: selected_data.map(row => row.metrics.mean_absolute_percentage)
          },
          {
            label:'median absolute',
            data: selected_data.map(row => row.metrics.media_absolute)
          },
          {
            label:'max error',
            data: selected_data.map(row => row.metrics.max_error)
          },
        ]
        }
    })
  }

  public displayData(){
    const selectedNodes = this.gridApi.getSelectedNodes()
    this.selected_data = selectedNodes.map(node => node.data)
    if (this.chart != null) {
      this.chart.destroy()
    }
    this.plotGraph(this.selected_data)
    // console.log(this.selected_data)
  }
}
