import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { APICalls } from '../../Api/ApiCalls';

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

export const fetchAllMaps = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  // Invoke API
  const apiCalls = APICalls.getInstance();
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any): Promise<void> => {
	const res = await apiCalls.getAllMapsFromPoeNinja();
	console.log('response from getAllMapsFromPoeNinja at actions: ');
	console.log(res);
  };
};
