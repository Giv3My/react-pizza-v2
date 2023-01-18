import React from 'react';
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUpdateEffect } from 'ahooks';
import qs from 'qs';

import {
  setCategoryId,
  setCurrentPage,
  setSearchValue,
} from '../redux/slices/filter/slice';
import { fetchPizzas } from '../redux/slices/pizza/fetching';
import { selectFilter } from '../redux/slices/filter/selectors';
import { selectPizzaData } from '../redux/slices/pizza/selectors';
import { Pizza } from '../redux/slices/pizza/types';

import { categories } from '../components/Categories/data';

import { Categories, Sort, PizzaBlock, PizzaSkeleton, Pagination } from '../components';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { searchValue, categoryId, sort, currentPage } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  React.useEffect(() => {
    getPizzas();
  }, []);

  useUpdateEffect(() => {
    const params = {
      sortBy: sort.property,
      category: categoryId ? String(categoryId) : null,
      page: String(currentPage),
      search: searchValue || null,
    };

    const queryString = qs.stringify(params, { skipNulls: true });

    navigate(`/?${queryString}`);

    getPizzas();
  }, [categoryId, sort.property, searchValue, currentPage]);

  const getPizzas = () => {
    const category = categoryId ? `&category=${categoryId}` : '';
    const sortBy = sort.property.replace('-', '');
    const order = sort.property.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? searchValue : '';

    dispatch(fetchPizzas({ category, sortBy, order, search, page: String(currentPage) }));
  };

  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setSearchValue(''));
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const pizzas = items.map((obj: Pizza) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...Array(6)].map((_, index) => <PizzaSkeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">{categories[categoryId]} пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.
          </p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
