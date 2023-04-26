import { Action, createReducer, on } from "@ngrx/store";
import { TestConnectionActions } from "../actions";
import { DBConnectionState, connectionAdapter, initialConnectionState } from "../states/test-connection.state";
import { TestConnectionState } from "../states";
// import { initialConnectionState } from "../states/test-connection.state"

export const connectionReducer = createReducer(
    initialConnectionState,

    on(TestConnectionActions.insertNewDataSuccess,
        (state, action) => connectionAdapter.setAll(
            action.data.data,
            {...state, loaded: true}
        ))

)

export function appReducer(
    state: DBConnectionState = initialConnectionState,
    action: Action
  ): DBConnectionState {
    switch (action.type) {
      case TestConnectionActions.INSERT_NEW_DATA_SUCCESS:
        return {
          ...state,
          // modify properties here
        };
      // more actions
      case TestConnectionActions.INSERT_NEW_DATA_FAILED:
        return {
          ...state,
          // modify properties here
        };
      default:
        return state;
    }
  }