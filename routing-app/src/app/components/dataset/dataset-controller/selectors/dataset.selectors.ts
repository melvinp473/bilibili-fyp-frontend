import {createFeatureSelector, createSelector} from "@ngrx/store";
import { DatasetState } from "../states";

export const selectedIdState = createFeatureSelector<DatasetState>("test");
export const selectDatasetID = createSelector(
    selectedIdState,
    state => state.datasetID.selectedDatasetID
)