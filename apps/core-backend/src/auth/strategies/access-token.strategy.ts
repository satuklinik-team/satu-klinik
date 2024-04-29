import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { JwtPayload } from '../types';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccessTokenJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-access-token',
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => {
        return req.cookies['__accessToken'];
      },
      secretOrKey: configService.get('secrets.access_token'),
      passReqToCallback: true,
    });
  }

  async validate(_: Request, payload: JwtPayload) {
    return payload;
  }
}
