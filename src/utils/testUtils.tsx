import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { RenderOptions } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';
import type { RootStateType } from '../app/features/store';
import userReducer from '../app/features/user/reducers';
import productReducer from '../app/features/product/reducers';
import categoryReducer from '../app/features/category/reducers';
import shippingReducer from '../app/features/shipping/reducers';
import cartReducer from '../app/features/cart/reducers';
import orderReducer from '../app/features/order/reducers';
import reviewsReducer from '../app/features/reviews/reducers';
import vacanciesReducer from '../app/features/vacancies/reducers';
import galleryReducer from '../app/features/gallery/reducers';


interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootStateType>,
  store?: any
};


export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {
      user: {
        status: 'succeeded',
        language: 'en',
        user: {
          _id: 'user_1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'j.doe@gmail.com',
          phone: '7777777',
          password: '123456',
          city: 'London',
          avatarUrl: 'https://www.storage.com/user_1_image.png',
          wishList: [],
          orders: [],
          isAdmin: true,
        },
        error: null
      }
    },
    store = configureStore({
      reducer: combineReducers({
        user: userReducer,
        product: productReducer,
        category: categoryReducer,
        shipping: shippingReducer,
        cart: cartReducer,
        order: orderReducer,
        reviews: reviewsReducer,
        vacancies: vacanciesReducer,
        gallery: galleryReducer,
      }),
      preloadedState
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    return <MemoryRouter>
      <Provider store={store}>
        {children}
      </Provider>
    </MemoryRouter>
  };

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};