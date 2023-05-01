import { DevServerPort } from './config';
import type { Express } from 'express';
import express from 'express';
import http from 'http';

const createHttpServer = (app: Express): http.Server => {
  const server = http.createServer(app);
  server.on('listening', () => {
    console.log(`listening to server on PORT ${DevServerPort}`);
  });
  server.on('error', error => {
    console.log('closing server owing to error', error.message);
    server.close();
  });
  return server;
};

const createExpressApp = (): Express => {
  const app = express();
  app.all('*', (_, response) => response.send('@rcc/server'));
  return app;
};

createHttpServer(createExpressApp())
  .listen(DevServerPort);
