// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  NODE_TLS_REJECT_UNAUTHORIZED: 0,
  LOG_LEVEL: 'debug',

  server: {
    host: '0.0.0.0',
    domainUrl: 'http://localhost:3000',
    port: 3000,
    globalPrefix: '/api',
  },

  database: {
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    database: 'postgres',
    username: 'postgres',
    password: 'postgres321',
    keepConnectionAlive: true,
    logging: true,
    synchronize: true,
  },

};
