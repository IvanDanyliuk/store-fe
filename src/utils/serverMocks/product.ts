import { rest } from 'msw';
import { server } from '../serverMock';
import { brandsResponseMock, productItem, productResponseMock } from '../testDataMocks';


const baseUrl = process.env.REACT_APP_API_BASE_URL;

const productSuccessHandlers = [
  rest.get(`${baseUrl}/products`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(productResponseMock)
    );
  }),
  rest.get(`${baseUrl}/products/top-rated`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(productResponseMock)
    );
  }),
  rest.get(`${baseUrl}/products/${productItem._id}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(productItem)
    );
  }),
  rest.get(`${baseUrl}/products/brands`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(brandsResponseMock)
    );
  }),
  rest.get(`${baseUrl}/products/search`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(productResponseMock.data)
    );
  }),
  rest.post(`${baseUrl}/products`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(productResponseMock.data[0])
    );
  }),
  rest.patch(`${baseUrl}/products`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(productResponseMock.data[0])
    );
  }),
  rest.delete(`${baseUrl}/products`, (req, res, ctx) => {
    return res(
      ctx.status(200),
    )
  }),
];

const productErrorHandlers = [
  rest.get(`${baseUrl}/products`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.get(`${baseUrl}/products/top-rated`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.get(`${baseUrl}/products/${productResponseMock.data[0]._id}`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.get(`${baseUrl}/products/brands`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.get(`${baseUrl}/products/search`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.post(`${baseUrl}/products`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.patch(`${baseUrl}/products`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.delete(`${baseUrl}/products`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
];


export const setupProductSuccessHandlers = () => {
  server.use(...productSuccessHandlers);
};

export const setupProductErrorHandlers = () => {
  server.use(...productErrorHandlers);
};