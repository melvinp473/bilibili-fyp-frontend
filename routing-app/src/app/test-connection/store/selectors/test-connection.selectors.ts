import {createFeatureSelector, createSelector} from "@ngrx/store";
import { TestConnectionState } from "../states";

export const selectTestConnectionState = createFeatureSelector<TestConnectionState>("test");
export const selectDatasetID = createSelector(
    selectTestConnectionState,
    state => state.mongoDBCol.selectedDatasetID
)