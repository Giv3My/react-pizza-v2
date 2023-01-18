import { CartItem } from '../redux/slices/cart/types';

export const calcTotalPrice = (items: CartItem[]): number => {
  return items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};
