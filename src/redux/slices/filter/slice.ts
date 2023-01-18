import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getFilters } from '../../../utils/getFilters';
import { FilterSliceState, Sort } from './types';

const initialState: FilterSliceState = getFilters();

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, { payload }: PayloadAction<string>) {
      state.searchValue = payload;
    },
    setCategoryId(state, { payload }: PayloadAction<number>) {
      state.categoryId = payload;
    },
    setSortType(state, { payload }: PayloadAction<Sort>) {
      state.sort = payload;
    },
    setCurrentPage(state, { payload }: PayloadAction<number>) {
      state.currentPage = payload;
    },
  },
});

export const { setCategoryId, setSortType, setCurrentPage, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
