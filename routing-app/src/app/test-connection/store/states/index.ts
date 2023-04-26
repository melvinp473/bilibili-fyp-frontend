import * as fromTestConnectionState from "./test-connection.state"

export interface TestConnectionState {
    mongoDBCol: fromTestConnectionState.DBConnectionState
}