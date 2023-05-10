import * as fromDatasetReducer from "./datase.reducer"
import { ActionReducerMap } from "@ngrx/store"
import { DatasetState } from "../states"

export const datasetReducers: ActionReducerMap<DatasetState> = {
    datasetID: fromDatasetReducer.DatasetReducer
}