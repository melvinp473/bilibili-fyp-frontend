import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';

import { ChartService } from 'src/app/services/chart-service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {

  data = [];
  linear_data: any[] = []
  svm_data: any[]  = []
  knn_data: any[]  = []
  tree_data: any[]  = []
  chart: any;
  selected_data = [];

  constructor(
    private chartService: ChartService
  ) { }

  ngOnInit() {

    this.chartService.getResults().subscribe((results) => {
      this.data = results.data
      // console.log(this.data)
      // console.log(results.data[0].algo_type)
      this.data.forEach( (item: any) => {
        if (item.algo_type == 'linear regression') {
          this.linear_data.push(item)
        }
        else if (item.algo_type == 'knn') {
          this.knn_data.push(item)
        }
        else if (item.algo_type == 'decision trees') {
          this.tree_data.push(item)
        }
        else if (item.algo_type == 'svm') {
          this.svm_data.push(item)
        }
    })
      console.log(this.linear_data)
      console.log(this.knn_data)
      console.log(this.svm_data)
      console.log(this.tree_data)
      const test_data = [this.linear_data.pop(), this.knn_data.pop(), this.svm_data.pop(), this.tree_data.pop()]
      console.log(test_data)


      this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: test_data.map(row => row.algo_type),
        datasets:[
          {
            label:'r2 score',
            data: test_data.map(row => row.metrics.r2_score)
          },
          {
            label:'mae',
            data: test_data.map(row => row.metrics.mae)
          },
          {
            label:'mse',
            data: test_data.map(row => row.metrics.mse)
          },
          {
            label:'mean absolute percentage',
            data: test_data.map(row => row.metrics.mean_absolute_percentage)
          },
          {
            label:'median absolute',
            data: test_data.map(row => row.metrics.media_absolute)
          },
          {
            label:'max error',
            data: test_data.map(row => row.metrics.max_error)
          },
        ]
        }
    })
    })
  }


}
