import { rest } from 'msw';
import { server } from '../serverMock';
import { userMock, userToUpdateMock } from '../testDataMocks';


const baseUrl = process.env.REACT_APP_API_BASE_URL;

const userSuccessHandlers = [
  rest.post(`${baseUrl}/user/signin`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ result: userMock, token: 'unique_user_token' })
    );
  }),
  rest.post(`${baseUrl}/user/signup`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ result: userMock, token: 'unique_user_token' })
    );
  }),
  rest.patch(`${baseUrl}/user`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(userToUpdateMock.userData)
    );
  }),
  rest.patch(`${baseUrl}/user/update-password`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(userToUpdateMock.userData)
    );
  }),
  rest.delete(`${baseUrl}/user`, (req, res, ctx) => {
    return res(
      ctx.status(200),
    );
  })
];

const userErrorHandlers = [
  rest.get(`${baseUrl}/user/signin`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.post(`${baseUrl}/user/signup`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.patch(`${baseUrl}/user`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.patch(`${baseUrl}/user/update-password`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.delete(`${baseUrl}/user`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  })
];


export const setupUserSuccessHandlers = () => {
  server.use(...userSuccessHandlers);
};

export const setupUserErrorHandlers = () => {
  server.use(...userErrorHandlers);
};