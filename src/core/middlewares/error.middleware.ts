import { NextFunction, Request, Response } from 'express';
import logger from 'loglevel';

export const errorMiddleware = (
  error: Error,
  _: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.headersSent) {
    next(error);
  } else {
    logger.error(error);
    res.status(500);
    res.json({
      message: error.message,
      // we only add a `stack` property in non-production environments
      ...(process.env.NODE_ENV === 'production'
        ? null
        : { stack: error.stack }),
    });
  }
};
