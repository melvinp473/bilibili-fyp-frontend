import { DatasetActions } from "../actions";
import { DatasetState } from "../states";
import { DatasetIdState, initialDatasetState } from "../states/dataset.state";

export function DatasetIDReducer(
    state: DatasetIdState = initialDatasetState,
    action: any
  ): DatasetIdState {
    switch (action.type) {
      case DatasetActions.LOAD_SELECTED_DATASET_ID_SUCCESS:
        return {
          ...state,
          // modify properties here
          selectedDatasetID: action.data
          
        };
      // more actions
      case DatasetActions.LOAD_SELECTED_DATASET_ID_FAILED:
        return {
          ...state,
          // modify properties here
        };
      default:
        return state;
    }
  }