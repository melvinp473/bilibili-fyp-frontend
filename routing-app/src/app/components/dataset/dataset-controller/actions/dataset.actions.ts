import { createAction, props } from "@ngrx/store";

export const LOAD_SELECTED_DATASET_ID_INIT = '[Selected Dataset Loading Effect] Load New Dataset Init'
export const LOAD_SELECTED_DATASET_ID_SUCCESS = '[Selected Dataset Loading Effect] Load New Dataset Success'
export const LOAD_SELECTED_DATASET_ID_FAILED = '[Selected Dataset Loading Effect] Load New Dataset Failed'


export const loadSelectedDatasetIDInit = createAction(
    LOAD_SELECTED_DATASET_ID_INIT,
    props<{data: string}>()
);

export const loadSelectedDatasetIDSuccess = createAction(
    LOAD_SELECTED_DATASET_ID_SUCCESS,
    props<{data: string}>()
);

export const loadSelectedDatasetIDFailed = createAction(
    LOAD_SELECTED_DATASET_ID_FAILED,
    props<{error: any}>()
);