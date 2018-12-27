import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { AnonymousStrategy } from './passport/anonymous.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'bearer', session: false }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, AnonymousStrategy],
  exports: [AuthService],
})
export class AuthModule {}
