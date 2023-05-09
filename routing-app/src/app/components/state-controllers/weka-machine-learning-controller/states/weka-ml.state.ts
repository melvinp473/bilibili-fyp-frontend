import {createEntityAdapter, EntityState} from "@ngrx/entity";

export interface WekaMLState {
    resultMetrics: any
    predictionData: any
}

export const connectionAdapter = createEntityAdapter({
})

export const initialWekaMLState = connectionAdapter.getInitialState({
    resultMetrics: null,
    predictionData: null
})