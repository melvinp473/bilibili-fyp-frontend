import {createFeatureSelector, createSelector} from "@ngrx/store";
import { WekaMLState } from "../states/weka-ml.state";

export const resultMetricsState = createFeatureSelector<WekaMLState>("wekaMLReducers");
export const getResultMetrics = createSelector(
    resultMetricsState,
    state => state.resultMetrics
)