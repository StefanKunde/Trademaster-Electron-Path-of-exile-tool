import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import poeNinjaData, {State as PoeNinjaDataState} from './PoeNinja/reducer';

export interface RootState {
	poeNinjaData: PoeNinjaDataState;
}

const store = createStore<RootState, any, any, any>(
  combineReducers({
	poeNinjaData,
  }),
  composeWithDevTools( applyMiddleware( thunk ) )
);

export default store;
