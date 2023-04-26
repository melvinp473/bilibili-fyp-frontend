import { createAction, props } from "@ngrx/store";
import { DatabaseModel } from "src/app/models/store-models/database.model";


export const INSERT_NEW_DATA_INIT = '[Data Insertion Effect] Insert New Data Init'
export const INSERT_NEW_DATA_SUCCESS = '[Data Insertion Effect] Insert New Data Success'
export const INSERT_NEW_DATA_FAILED = '[Data Insertion Effect] Insert New Data Failed'


export const insertNewDataInit = createAction(
    INSERT_NEW_DATA_INIT,
    props<{data: any}>()
);

export const insertNewDataSuccess = createAction(
    INSERT_NEW_DATA_SUCCESS,
    props<{data: any}>()
);

export const insertNewDataFailed = createAction(
    INSERT_NEW_DATA_FAILED,
    props<{error: any}>()
);