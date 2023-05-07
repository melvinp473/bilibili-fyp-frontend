import {createFeatureSelector, createSelector} from "@ngrx/store";
import { DatasetState } from "../states";

export const selectedDatasetState = createFeatureSelector<DatasetState>("test");
export const selectDatasetID = createSelector(
    selectedDatasetState,
    state => state.datasetID.selectedDatasetID
)