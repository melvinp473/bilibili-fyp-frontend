import { createAction, props } from "@ngrx/store";

export const WEKA_ML_ALGO_INIT = '[Weka ML Algo Effect] Weka ML Alogrithm Run Init'
export const WEKA_ML_ALGO_SUCCESS = '[Weka ML Algo Effect] Weka ML Alogrithm Run Success'
export const WEKA_ML_ALGO_FAILED = '[Weka ML Algo Effect] Weka ML Alogrithm Run Failed'

export const wekaMLAlgoInit = createAction(
    WEKA_ML_ALGO_INIT,
    props<{dataset_id: string, algo: string, selected_attributes: string[], additional_params: any}>()
);

export const wekaMLAlgoSuccess = createAction(
    WEKA_ML_ALGO_SUCCESS,
    props<{data: any}>()
);

export const wekaMLAlgoFailed = createAction(
    WEKA_ML_ALGO_FAILED,
    props<{error: any}>()
);