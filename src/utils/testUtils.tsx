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
      },
      category: {
        status: 'succeeded',
        category: null,
        categories: [
          {
            main: {
              title: 'Main Category Name',
              url: 'main-category-title'
            },
            subCategories: [
              {
                title: 'Sub-category name',
                image: 'https://www.storage.com/categories/category_1.png',
                url: 'sub-category-name'
              },
            ],
          },
        ],
        error: null
      },
      product: {
        status: 'succeeded',
        brands: ['Test Brand'],
        product: null,
        products: {
          data: [{
            _id: 'product_id_1',
            brand: 'Test Brand',
            category: {
              main: {
                title: 'Main Category Name',
                url: 'main-category-title'
              },
              subCategory: {
                title: 'Sub-category name',
                url: 'sub-category-name'
              }
            },
            color: '#ffffff',
            description: 'Test Descrinption',
            image: 'https://www.storage.com/categories/test_product.png',
            isInStock: true,
            price: 1000,
            promotion: ['TOP'],
            rating: 5,
            shortInfo: 'Test short information',
            title: 'Test Title'
          }],
          pages: 1
        },
        search: [
          {
            _id: 'product_id_1',
            brand: 'Test Brand',
            category: {
              main: {
                title: 'Main Category Name',
                url: 'main-category-title'
              },
              subCategory: {
                title: 'Sub-category name',
                url: 'sub-category-name'
              }
            },
            color: '#ffffff',
            description: 'Test Descrinption',
            image: 'https://www.storage.com/categories/test_product.png',
            isInStock: true,
            price: 1000,
            promotion: ['TOP'],
            rating: 5,
            shortInfo: 'Test short information',
            title: 'Test Title'
          }
        ],
        error: null
      },
      cart: {
        status: 'succeeded',
        cart: [
          {
            product: {
              _id: 'product_id_1',
              brand: 'Test Brand',
              category: {
                main: {
                  title: 'Main Category Name',
                  url: 'main-category-title'
                },
                subCategory: {
                  title: 'Sub-category name',
                  url: 'sub-category-name'
                }
              },
              color: '#ffffff',
              description: 'Test Descrinption',
              image: 'https://www.storage.com/categories/test_product.png',
              isInStock: true,
              price: 1000,
              promotion: ['TOP'],
              rating: 5,
              shortInfo: 'Test short information',
              title: 'Test Title'
            },
            quantity: 1
          }
        ],
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

export const renderWithProvidersErrorCase = (
  ui: React.ReactElement,
  {
    preloadedState = {
      user: {
        status: 'failed',
        language: 'en',
        user: null,
        error: 'User error'
      },
      category: {
        status: 'failed',
        category: null,
        categories: [],
        error: 'Category error'
      },
      gallery: {
        status: 'failed',
        imageUrls: [],
        error: 'Gallery error'
      },
      order: {
        status: 'failed',
        order: null,
        clientSecret: 'client_secret_unique_key',
        orders: {
          data: [],
          pages: 0,
        },
        error: 'Order error'
      },
      product: {
        status: 'failed',
        search: [],
        product: null,
        products: {
          data: [],
          pages: 0
        },
        brands: [],
        error: 'Product error'
      },
      reviews: {
        status: 'failed',
        reviews: [],
        error: 'Reviews error'
      },
      shipping: {
        status: 'failed',
        shipping: null,
        shippings: [],
        error: 'Shipping error'
      },
      vacancies: {
        status: 'failed',
        vacancy: null,
        vacancies: {
          data: [],
          pages: 0,
        },
        error: 'Vacancies error'
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

export const renderWithProvidersForUpdation = (
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
      },
      category: {
        status: 'succeeded',
        category: {
          main: {
            title: 'Main Category Name',
            url: 'main-category-title'
          },
          subCategories: [
            {
              title: 'Sub-category name',
              image: 'https://www.storage.com/categories/category_1.png',
              url: 'sub-category-name'
            },
          ],
        },
        categories: [
          {
            main: {
              title: 'Main Category Name',
              url: 'main-category-title'
            },
            subCategories: [
              {
                title: 'Sub-category name',
                image: 'https://www.storage.com/categories/category_1.png',
                url: 'sub-category-name'
              },
            ],
          },
        ],
        error: null
      },
      product: {
        status: 'succeeded',
        brands: ['Test Brand'],
        product: {
          _id: 'product_id_1',
          brand: 'Test Brand',
          category: {
            main: {
              title: 'Main Category Name',
              url: 'main-category-title'
            },
            subCategory: {
              title: 'Sub-category name',
              url: 'sub-category-name'
            }
          },
          color: '#ffffff',
          description: 'Test Descrinption',
          image: 'https://www.storage.com/categories/test_product.png',
          isInStock: true,
          price: 1000,
          promotion: ['TOP'],
          rating: 5,
          shortInfo: 'Test short information',
          title: 'Test Title'
        },
        products: {
          data: [{
            _id: 'product_id_1',
            brand: 'Test Brand',
            category: {
              main: {
                title: 'Main Category Name',
                url: 'main-category-title'
              },
              subCategory: {
                title: 'Sub-category name',
                url: 'sub-category-name'
              }
            },
            color: '#ffffff',
            description: 'Test Descrinption',
            image: 'https://www.storage.com/categories/test_product.png',
            isInStock: true,
            price: 1000,
            promotion: ['TOP'],
            rating: 5,
            shortInfo: 'Test short information',
            title: 'Test Title'
          }],
          pages: 1
        },
        search: [
          {
            _id: 'product_id_1',
            brand: 'Test Brand',
            category: {
              main: {
                title: 'Main Category Name',
                url: 'main-category-title'
              },
              subCategory: {
                title: 'Sub-category name',
                url: 'sub-category-name'
              }
            },
            color: '#ffffff',
            description: 'Test Descrinption',
            image: 'https://www.storage.com/categories/test_product.png',
            isInStock: true,
            price: 1000,
            promotion: ['TOP'],
            rating: 5,
            shortInfo: 'Test short information',
            title: 'Test Title'
          }
        ],
        error: null
      },
      cart: {
        status: 'succeeded',
        cart: [
          {
            product: {
              _id: 'product_id_1',
              brand: 'Test Brand',
              category: {
                main: {
                  title: 'Main Category Name',
                  url: 'main-category-title'
                },
                subCategory: {
                  title: 'Sub-category name',
                  url: 'sub-category-name'
                }
              },
              color: '#ffffff',
              description: 'Test Descrinption',
              image: 'https://www.storage.com/categories/test_product.png',
              isInStock: true,
              price: 1000,
              promotion: ['TOP'],
              rating: 5,
              shortInfo: 'Test short information',
              title: 'Test Title'
            },
            quantity: 1
          }
        ],
        error: null
      },
      shipping: {
        status: 'succeeded',
        shipping: {
          _id: 'shipping_id_1',
          company: 'Test Company',
          country: 'Test Country',
          cities: ['Test City 1', 'Test City 2', 'Test City 3'],
          price: 100
        },
        shippings: [
          {
            _id: 'shipping_id_1',
            company: 'Test Company',
            country: 'Test Country',
            cities: ['Test City 1', 'Test City 2', 'Test City 3'],
            price: 100
          }
        ],
        error: null
      },
      vacancies: {
        status: 'succeeded',
        vacancy: {
          _id: 'vacancy_id_1',
          title: 'Test Title',
          character: 'Test Character',
          employment: 'Test Employment',
          experience: 'Test Experience',
          responsibilities: 'Test Responsibilities',
          mustHaves: 'Test Must Haves',
          contactPerson: 'Test Contact Person',
          contactPhone: '777 777 77 77',
          contactEmail: 'test@test.com',
          salary: '1000',
          createdAt: new Date().toDateString(),
        },
        vacancies: {
          data: [
            {
              _id: 'vacancy_id_1',
              title: 'Test Title',
              character: 'Test Character',
              employment: 'Test Employment',
              experience: 'Test Experience',
              responsibilities: 'Test Responsibilities',
              mustHaves: 'Test Must Haves',
              contactPerson: 'Test Contact Person',
              contactPhone: '777 777 77 77',
              contactEmail: 'test@test.com',
              salary: '1000',
              createdAt: new Date().toDateString(),
            }
          ],
          pages: 1
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