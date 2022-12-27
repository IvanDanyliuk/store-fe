import { rest } from 'msw';
import { server } from '../serverMock';
import { vacancyItemMock, vacancyResponseMock, vacancyToUpdateMock } from '../testDataMocks';


const baseUrl = process.env.REACT_APP_API_BASE_URL;

const vacanciesSuccessHandlers = [
  rest.get(`${baseUrl}/vacancies`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(vacancyResponseMock)
    );
  }),
  rest.get(`${baseUrl}/vacancies/${vacancyResponseMock.data[0]._id}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(vacancyResponseMock.data[0])
    );
  }),
  rest.post(`${baseUrl}/vacancies`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(vacancyItemMock)
    );
  }),
  rest.patch(`${baseUrl}/vacancies`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(vacancyToUpdateMock.updatedVacancy)
    );
  }),
  rest.delete(`${baseUrl}/vacancies`, (req, res, ctx) => {
    return res(
      ctx.status(200),
    );
  })
];

const vacanciesErrorHandlers = [
  rest.get(`${baseUrl}/vacancies`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.get(`${baseUrl}/vacancies/${vacancyItemMock._id}`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.post(`${baseUrl}/vacancies`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.patch(`${baseUrl}/vacancies`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  }),
  rest.delete(`${baseUrl}/vacancies`, (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({ message: 'error' })
    );
  })
];


export const setupVacanciesSuccessHandlers = () => {
  server.use(...vacanciesSuccessHandlers);
};

export const setupVacanciesErrorHandlers = () => {
  server.use(...vacanciesErrorHandlers);
};