import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { JwtPayload } from '../types';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshTokenJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => {
        req.cookies['__refreshToken'];
      },
      secretOrKey: configService.get('secrets.refresh_token'),
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
