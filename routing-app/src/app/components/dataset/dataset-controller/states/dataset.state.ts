import {createEntityAdapter, EntityState} from "@ngrx/entity";

export interface DatasetIdState {
    selectedDatasetID: string
}

export const connectionAdapter = createEntityAdapter({
})

export const initialDatasetState = connectionAdapter.getInitialState({
    selectedDatasetID: ""
})