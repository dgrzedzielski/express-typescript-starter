import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import { errorMiddleware } from '~/core/middlewares/error.middleware';

export const createApp = (): Application => {
  const app = express();

  // app.use('/api', getRoutes());
  app.get('/api', (req, res) => {
    return res.json({
      message: 'test',
    });
  });
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(errorMiddleware);

  return app;
};
