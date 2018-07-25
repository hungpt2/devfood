import {
  Action,
  ActionCreator
} from 'redux';

export const ADD_TO_CART: string = 'ADD_TO_CART';
export const add_to_cart: ActionCreator<Action> = (data) => ({
  type: ADD_TO_CART,
  payload: data
});

export const UPDATE: string = 'UPDATE';
export const update: ActionCreator<Action> = (data) => ({
  type: UPDATE,
  payload: data
});

export const INITIAL_CART: string = 'INITIAL_CART';
export const initial_cart: ActionCreator<Action> = () => ({
  type: INITIAL_CART
});

export const CLEAR_CART: string = 'CLEAR_CART';
export const clear_cart: ActionCreator<Action> = () => ({
  type: CLEAR_CART
});
