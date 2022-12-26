import { rest } from 'msw';
import { server } from '../serverMock';
import { shippingItemMock, shippingsMock, shippingToUpdateMock } from '../testDataMocks';


const baseUrl = process.env.REACT_APP_API_BASE_URL;

const shippingSuccessHandlers = [
  rest.get(`${baseUrl}/shipping`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(shippingsMock)
    );
  }),
  rest.post(`${baseUrl}/shipping`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(shippingItemMock)
    );
  }),
  rest.patch(`${baseUrl}/shipping`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(shippingToUpdateMock.updatedShipping)
    );
  }),
  rest.delete(`${baseUrl}/shipping`, (req, res, ctx) => {
    return res(
      ctx.status(200)
    );
  }),
];

const shippingErrorHandlers = [
  rest.get(`${baseUrl}/shipping`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.post(`${baseUrl}/shipping`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.patch(`${baseUrl}/shipping`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.delete(`${baseUrl}/shipping`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
];


export const setupShippingSuccessHandlers = () => {
  server.use(...shippingSuccessHandlers);
};

export const setupShippingErrorHandlers = () => {
  server.use(...shippingErrorHandlers);
};