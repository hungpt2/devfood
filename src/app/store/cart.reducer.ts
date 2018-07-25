/**
 * Counter Reducer
 */
import { Reducer } from 'redux';
import { AppState } from './app.state';
import {
  INITIAL_CART,
  ADD_TO_CART,
  UPDATE
} from './cart.actions';

let initialState: AppState = { listProduct: [] };

// Create our reducer that will handle changes to the state
export const listProductReducer: Reducer<AppState> =
  (state: AppState = initialState, action: any): AppState => {
    switch (action.type) {
      case UPDATE:
        return Object.assign({}, state, { listProduct: action.payload });
      case INITIAL_CART:
        return Object.assign({}, state, { listProduct: [] });
      case ADD_TO_CART:
        return Object.assign({}, state, { listProduct: [...state.listProduct, action.payload] });
      default:
        return state;
    }
  };
