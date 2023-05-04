import * as globalMiddlewares from './global-middlewares';
import { initializeAppDataSource } from './database';
import * as utilities from './utilities';
import type { Express } from 'express';
import * as config from './config';
import express from 'express';
import http from 'http';

const createExpressApp = (): Express => {
  const app = express();
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use('*', globalMiddlewares.global404());
  app.use(globalMiddlewares.globalError());
  return app;
};

const init = async (): Promise<void> => {
  await initializeAppDataSource();
  const server = http.createServer(createExpressApp());
  utilities.attachServerCallbacks(server);
  server.listen(config.AppServerPort);
};

void init();
