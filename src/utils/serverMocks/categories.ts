import { rest } from 'msw';
import { server } from '../serverMock';
import { categoriesListMock, categoryToUpdate } from '../testDataMocks';


const baseUrl = process.env.REACT_APP_API_BASE_URL;

const categoriesSuccessHandlers = [
  rest.get(`${baseUrl}/categories`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(categoriesListMock)
    );
  }),
  rest.post(`${baseUrl}/categories`, (req, res, ctx) => {
    return res(
      ctx.status(200)
    );
  }),
  rest.patch(`${baseUrl}/categories`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(categoryToUpdate.updatedCategory)
    );
  }),
  rest.delete(`${baseUrl}/categories`, (req, res, ctx) => {
    return res(
      ctx.status(200)
    );
  }),
];

const categoriesErrorHandlers = [
  rest.get(`${baseUrl}/categories`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.post(`${baseUrl}/categories`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.patch(`${baseUrl}/categories`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.delete(`${baseUrl}/categories`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
];


export const setupCategoriesSuccessHandlers = () => {
  server.use(...categoriesSuccessHandlers);
};

export const setupCategoriesErrorHandlers = () => {
  server.use(...categoriesErrorHandlers);
};