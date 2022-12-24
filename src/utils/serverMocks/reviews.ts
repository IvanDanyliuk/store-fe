import { rest } from 'msw';
import { server } from '../serverMock';
import { reviewItemMock, reviewItemToUpdate, reviewsMock } from '../testDataMocks';


const baseUrl = process.env.REACT_APP_API_BASE_URL;

const reviewsSuccessHandlers = [
  rest.get(`${baseUrl}/reviews/user`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(reviewsMock)
    );
  }),
  rest.get(`${baseUrl}/reviews/product`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(reviewsMock)
    );
  }),
  rest.post(`${baseUrl}/reviews`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(reviewItemMock)
    );
  }),
  rest.patch(`${baseUrl}/reviews`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(reviewItemToUpdate.updatedReview)
    );
  }),
  rest.delete(`${baseUrl}/reviews`, (req, res, ctx) => {
    return res(
      ctx.status(200),
    );
  }),
];

const reviewsErrorHandlers = [
  rest.get(`${baseUrl}/reviews/user`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.get(`${baseUrl}/reviews/product`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.post(`${baseUrl}/reviews`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.patch(`${baseUrl}/reviews`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.delete(`${baseUrl}/reviews`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
];


export const setupReviewsSuccessHandlers = () => {
  server.use(...reviewsSuccessHandlers);
};

export const setupReviewsErrorHandlers = () => {
  server.use(...reviewsErrorHandlers);
};