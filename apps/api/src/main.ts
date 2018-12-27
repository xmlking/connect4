import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { ConfigService } from './app/config';
import * as helmet from 'helmet';
import { environment as env } from '@env-api/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config: ConfigService = app.get(ConfigService);
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
      forbidUnknownValues: true,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Game API Docs')
    .setDescription('Game API for connect4')
    .setVersion(config.getVersion())
    .addTag('Game API')
    .setSchemes(config.isProd() ? 'https' : 'http')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(env.server.port || 3000, env.server.host || '0.0.0.0');
}

bootstrap();
