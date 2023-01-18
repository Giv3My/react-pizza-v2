export type Pizza = {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  sizes: number[];
  types: number[];
  category: number;
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

export type SearchPizzaParams = {
  category: string;
  sortBy: string;
  order: string;
  search: string;
  page: string;
};
