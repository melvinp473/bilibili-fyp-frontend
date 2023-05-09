import { WekaMLActions } from "../actions";
import { WekaMLState, initialWekaMLState } from "../states/weka-ml.state";


export function WekaMLReducer(
    state: WekaMLState = initialWekaMLState,
    action: any
    ): WekaMLState {
        switch (action.type) {
            case WekaMLActions.WEKA_ML_ALGO_SUCCESS:
              return {
                ...state,
                // modify properties here
                resultMetrics: action.data
                
              };
            // more actions
            case WekaMLActions.WEKA_ML_ALGO_FAILED:
              return {
                ...state,
                // modify properties here
              };
            default:
              return state;
          }
    }