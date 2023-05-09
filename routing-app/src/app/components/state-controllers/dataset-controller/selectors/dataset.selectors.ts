import {createFeatureSelector, createSelector} from "@ngrx/store";
import { DatasetState } from "../states";
import { DatasetIdState } from "../states/dataset.state";

export const selectedDatasetState = createFeatureSelector<DatasetIdState>("datasetReducers");
export const selectDatasetID = createSelector(
    selectedDatasetState,
    state => state.selectedDatasetID
)