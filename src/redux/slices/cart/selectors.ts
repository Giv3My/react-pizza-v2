import { RootState } from '../../store';

export const selectCart = (state: RootState) => state.cart;

export const selectPizzaById = (id: string) => (state: RootState) => {
  return state.cart.items.find((obj) => obj.id === id);
};
