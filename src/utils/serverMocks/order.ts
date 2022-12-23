import { rest } from 'msw';
import { server } from '../serverMock';
import { orderItemMock, ordersMock, orderToUpdate } from '../testDataMocks';


const baseUrl = process.env.REACT_APP_API_BASE_URL;

const orderSuccessHandlers = [
  rest.get(`${baseUrl}/orders/admin`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(ordersMock)
    );
  }),
  rest.get(`${baseUrl}/orders/user`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(ordersMock)
    );
  }),
  rest.post(`${baseUrl}/orders`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(orderItemMock)
    );
  }),
  rest.patch(`${baseUrl}/orders`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(orderToUpdate.updatedOrder)
    );
  }),
  rest.delete(`${baseUrl}/orders`, (req, res, ctx) => {
    return res(
      ctx.status(200)
    );
  }),
  rest.post(`${baseUrl}/orders/payment`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json('client_secret_key')
    );
  }),
];

const orderErrorHandlers = [
  rest.get(`${baseUrl}/orders/admin`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.get(`${baseUrl}/orders/user`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.post(`${baseUrl}/orders`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.patch(`${baseUrl}/orders`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.delete(`${baseUrl}/orders`, (req, res, ctx) => {
    return res(
      ctx.status(500)
    );
  }),
  rest.post(`${baseUrl}/orders/payment`, (req, res, ctx) => {
    return res(
      ctx.status(500)
    );
  })
];


export const setupOrderSuccessHandlers = () => {
  server.use(...orderSuccessHandlers);
};

export const setupOrderErrorHandlers = () => {
  server.use(...orderErrorHandlers);
};