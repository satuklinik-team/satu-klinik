import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import {
  AccessTokenJwtStrategy,
  RefreshTokenJwtStrategy,
} from 'src/auth/strategies';

@Module({
  providers: [
    TokenService,
    JwtService,
    AccessTokenJwtStrategy,
    RefreshTokenJwtStrategy,
  ],
  imports: [JwtModule.register({})],
  exports: [TokenService],
})
export class TokenModule {}
