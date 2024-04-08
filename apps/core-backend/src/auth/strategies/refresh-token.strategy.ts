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
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => {
        let token = null;
        if (req.cookies['__refreshToken']) {
          token = req.cookies['__refreshToken'];
        }

        return token;
      },
      secretOrKey: configService.get('secrets.refresh_token'),
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
