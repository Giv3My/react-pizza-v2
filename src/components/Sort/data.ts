import { Sort, SortPropertyEnum } from '../../redux/slices/filter/types';

export const sortList: Sort[] = [
  { name: 'популярности (DESC)', property: SortPropertyEnum.RATING_DESC },
  { name: 'популярности (ASC)', property: SortPropertyEnum.RATING_ASC },
  { name: 'цене (DESC)', property: SortPropertyEnum.PRICE_DESC },
  { name: 'цене (ASC)', property: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавиту (DESC)', property: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту (ASC)', property: SortPropertyEnum.TITLE_ASC },
];
