import { combineReducers } from '@reduxjs/toolkit';

import filterSlice from './filter/slice';
import pizzaSlice from './pizza/slice';
import cartSlice from './cart/slice';

const reducers = combineReducers({
  filter: filterSlice,
  pizza: pizzaSlice,
  cart: cartSlice,
});

export default reducers;
