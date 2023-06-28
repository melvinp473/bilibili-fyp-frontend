import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-delete-cell-renderer',
  templateUrl: './delete-cell-renderer.component.html',
  styleUrls: ['./delete-cell-renderer.component.css']
})
export class DeleteCellRendererComponent implements ICellRendererAngularComp {
  value!: string;
  service!: any;

  agInit(params: any): void {
    this.value = params.value;
    this.service = params.service;
  }

  // gets called whenever the user gets the cell to refresh
  refresh(params: any) {
    // set value into cell again
    this.value = params.value;
    this.service = params.deleteServiceCall;
    return true;
  }

  buttonClicked() {
    console.log(this.service)
    this.service.delete(this.value).subscribe(() => {
    })
  }

}