import { AppServerPort } from './config';
import type http from 'http';

export const attachServerCallbacks = (server: http.Server): void => {
  server.on('listening', () => {
    const message = `listening to server on PORT ${AppServerPort}`;
    console.log(message);
  });

  server.on('error', error => {
    const message = 'closing server owing to error';
    console.log(message, error.message);
    server.close();
  });
};
