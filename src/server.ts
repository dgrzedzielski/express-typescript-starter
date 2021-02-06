import 'module-alias/register';
import { Server } from 'http';
import logger from 'loglevel';
import { createApp } from '~/app';
import { defaultConfig } from '~/config';

export const startServer = ({ port }: { port: number }): Promise<Server> => {
  const app = createApp();

  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      setupCloseOnExit(server);
      resolve(server);
    });
  });
};

const setupCloseOnExit = (server: Server) => {
  // thank you stack overflow
  // https://stackoverflow.com/a/14032965/971592
  async function exitHandler(options: Record<string, unknown> = {}) {
    try {
      await server.close(() => {
        logger.info('Server successfully closed');
      });
    } catch (e: unknown) {
      logger.warn('Something went wrong closing the server', e);
    }

    if (options.exit) process.exit();
  }

  // do something when app is closing
  process.on('exit', exitHandler);

  // catches ctrl+c event
  process.on('SIGINT', exitHandler.bind(null, { exit: true }));

  // catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
  process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

  // catches uncaught exceptions
  process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
};

startServer({
  port: defaultConfig.port,
}).then((server) => {
  logger.info(`Listening on ${server.address}`);
});
