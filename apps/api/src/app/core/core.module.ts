import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './interceptors';
import { ConnectionOptions } from 'typeorm';
import { environment as env } from '@env-api/environment';
import { User } from '../auth/user.entity';
import { Match } from '../game/match/match.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) =>
        ({
          ...env.database,
          entities: [User, Match],
        } as ConnectionOptions),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [
    // Enable for debugging in Dev env.
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class CoreModule {}
