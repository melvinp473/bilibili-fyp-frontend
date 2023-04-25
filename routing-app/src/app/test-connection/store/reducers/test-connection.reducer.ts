import { createReducer, on } from "@ngrx/store";
import { TestConnectionActions } from "../actions";
import { connectionAdapter, initialConnectionState } from "../states/test-connection.state";
// import { initialConnectionState } from "../states/test-connection.state"

export const connectionReducer = createReducer(
    initialConnectionState,

    on(TestConnectionActions.insertNewDataSuccess,
        (state, action) => connectionAdapter.setAll(
            action.data.data,
            {...state, loaded: true}
        ))

)