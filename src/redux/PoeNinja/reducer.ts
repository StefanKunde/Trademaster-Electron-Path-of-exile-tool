import { combineReducers } from 'redux';
import { Action } from './actions';

// States' definition
export interface IPoeNinjaData {
  allMaps: any[]; // Set after creation
}

export interface State {
  poeNinjaData: IPoeNinjaData; // Set after creation
}

const poeNinjaData = (state: IPoeNinjaData = { allMaps: [] }, action: Action): IPoeNinjaData => {
  switch (action.type) {
	case 'SET_ALL_MAPS':
		return { ...state, allMaps: action.allMaps };
	default: return state;
  }
};

export default combineReducers<State>({
	poeNinjaData
});
