export const environment = {
  production: true,

  NODE_TLS_REJECT_UNAUTHORIZED: 0,

  server: {
    host: process.env.HOST || '0.0.0.0',
    domainUrl: process.env.DOMAIN_URL || 'http://localhost:3000',
    port: process.env.PORT || 3000,
    globalPrefix: '/api',
  },

  database: {
    type: 'postgres',
    host: process.env.TYPEORM_HOST || 'postgres',
    port: process.env.TYPEORM_PORT ? Number(process.env.TYPEORM_PORT) : 5432,
    database: process.env.TYPEORM_DATABASE || 'postgres',
    username: process.env.TYPEORM_USERNAME || 'postgres',
    password: process.env.TYPEORM_PASSWORD || 'postgres321',
    keepConnectionAlive: true,
    logging: process.env.TYPEORM_LOGGING ? JSON.parse(process.env.TYPEORM_LOGGING) : false,
    synchronize: false,
  },

};
