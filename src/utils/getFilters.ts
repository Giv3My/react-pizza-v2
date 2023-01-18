import qs from 'qs';

import { FilterSliceState, SortPropertyEnum } from '../redux/slices/filter/types';
import { SearchPizzaParams } from '../redux/slices/pizza/types';

import { sortList } from '../components/Sort/data';

export const getFilters = (): FilterSliceState => {
  if (!window.location.search) {
    return {
      searchValue: '',
      categoryId: 0,
      sort: {
        name: 'популярности (DESC)',
        property: SortPropertyEnum.RATING_DESC,
      },
      currentPage: 1,
    };
  }

  const params = qs.parse(window.location.search.substring(1)) as SearchPizzaParams;

  const sort = sortList.find((obj) => obj.property === params.sortBy);

  return {
    searchValue: params.search || '',
    categoryId: Number(params.category) || 0,
    currentPage: Number(params.page) || 1,
    sort: sort || sortList[0],
  };
};
