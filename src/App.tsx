import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useUpdateEffect } from 'ahooks';

import { selectCart } from './redux/slices/cart/selectors';
import { setDataToLS } from './services/localStorage.service';

import { MainLayout } from './layouts';
import { Home, NotFound } from './pages';

import './scss/app.scss';

const FullPizza = React.lazy(() =>
  import('./pages').then((module) => ({ default: module.FullPizza }))
);
const Cart = React.lazy(() =>
  import('./pages').then((module) => ({ default: module.Cart }))
);

function App() {
  const cart = useSelector(selectCart);

  useUpdateEffect(() => {
    setDataToLS('cart', cart);
  }, [cart]);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback="Loading...">
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="cart"
          element={
            <Suspense fallback="Loading...">
              <Cart />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
