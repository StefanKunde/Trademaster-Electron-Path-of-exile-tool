import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

// Action Definition
export interface SetAllMaps {
  type: 'SET_ALL_MAPS';
  allMaps: any[]; // Change type after creation
}

// Union Action Types
export type Action = SetAllMaps;

// Action Creators
export const setAllZentralerKatalogGeraetetypen = (allMaps: any[]): SetAllMaps => {
  return { type: 'SET_ALL_MAPS', allMaps: allMaps };
};

export const fetchAllItems = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  // Invoke API
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any): Promise<void> => {
	// fetching here...
  };
};
