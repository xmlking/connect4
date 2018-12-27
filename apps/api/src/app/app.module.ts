import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { CoreModule } from './core';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game';
// import { ChatModule } from './chat';
import { AppController } from './app.controller';

@Module({
  imports: [
    RouterModule.forRoutes([
      {
        path: '/api',
        children: [
          { path: '/auth', module: AuthModule },
          { path: '/game', module: GameModule },
          // { path: '/chat', module: ChatModule },
        ],
      },
    ]),
    CoreModule,
    AuthModule,
    GameModule,
    // ChatModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
