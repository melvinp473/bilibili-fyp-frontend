import { createAction, props } from "@ngrx/store";

export const LOAD_SELECTED_DATASET_INIT = '[Selected Dataset Loading Effect] Load New Dataset Init'
export const LOAD_SELECTED_DATASET_SUCCESS = '[Selected Dataset Loading Effect] Load New Dataset Success'
export const LOAD_SELECTED_DATASET_FAILED = '[Selected Dataset Loading Effect] Load New Dataset Failed'


export const loadSelectedDatasetInit = createAction(
    LOAD_SELECTED_DATASET_INIT,
    props<{data: any}>()
);

export const loadSelectedDatasetSuccess = createAction(
    LOAD_SELECTED_DATASET_SUCCESS,
    props<{data: string}>()
);

export const loadSelectedDatasetFailed = createAction(
    LOAD_SELECTED_DATASET_FAILED,
    props<{error: any}>()
);