import { Component, EventEmitter, Output } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export interface DeleteCellRendererParams{
  service?: any;
}
@Component({
  selector: 'app-delete-cell-renderer',
  templateUrl: './delete-cell-renderer.component.html',
  styleUrls: ['./delete-cell-renderer.component.css']
})
export class DeleteCellRendererComponent implements ICellRendererAngularComp {
  value!: string;
  service!: any;
  params!: ICellRendererParams;

  agInit(params: ICellRendererParams & DeleteCellRendererParams): void {
    this.params = params;
    this.value = params.value;
    this.service = params.service;
  }

  // gets called whenever the user gets the cell to refresh
  refresh(params: ICellRendererParams & DeleteCellRendererParams) {
    // set value into cell again
    this.value = params.value;
    this.service = params.service;
    return true;
  }

  buttonClicked() {
    this.service.delete(this.value).subscribe((response: any) => {
      this.params.context.componentParent.onDeleteCompleted(response)
    })
  }

}