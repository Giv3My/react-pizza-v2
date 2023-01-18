import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Pizza, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzas',
  async (params, { rejectWithValue }) => {
    const { category, sortBy, order, search, page } = params;

    try {
      const { data } = await axios.get<Pizza[]>(
        'https://6294d9f663b5d108c195b10f.mockapi.io/api/items' +
          `?page=${page}&limit=4` +
          `${category}&sortBy=${sortBy}&order=${order}&search=${search}`
      );

      return data;
    } catch (err) {
      return rejectWithValue([]);
    }
  }
);
