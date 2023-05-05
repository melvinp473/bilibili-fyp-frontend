import * as fromTestConnectionReducer from "./test-connection.reducer"

import { ActionReducerMap } from '@ngrx/store';
import { TestConnectionState } from "../states";

export const testConnectionReducers: ActionReducerMap<TestConnectionState> = {
    mongoDBCol: fromTestConnectionReducer.appReducer
}