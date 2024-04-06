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
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => {
        let token = null;

        if (req.cookies['__accessToken']) {
          token = req.cookies['__accessToken'];
        }

        return token;
      },
      secretOrKey: configService.get('secrets.access_token'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    return payload;
  }
}
