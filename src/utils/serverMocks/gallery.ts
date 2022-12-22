import { rest } from 'msw';
import { server } from '../serverMock';
import { galleryUrlsSuccess } from '../testDataMocks';


const baseUrl = process.env.REACT_APP_API_BASE_URL;

const gallerySuccessHandlers = [
  rest.get(`${baseUrl}/gallery`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(galleryUrlsSuccess)
    );
  }),
  rest.post(`${baseUrl}/gallery`, (req, res, ctx) => {
    return res(
      ctx.status(200)
    );
  }),
  rest.delete(`${baseUrl}/gallery`, (req, res, ctx) => {
    return res(
      ctx.status(200)
    );
  }),
];

const galleryErrorHandlers = [
  rest.get(`${baseUrl}/gallery`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.post(`${baseUrl}/gallery`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.delete(`${baseUrl}/gallery`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
];


export const setupGallerySuccessHandlers = () => {
  server.use(...gallerySuccessHandlers);
};

export const setupGalleryErrorHandlers = () => {
  server.use(...galleryErrorHandlers);
};