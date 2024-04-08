import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getAuthToken<T = Record<string, unknown>>(
    data: T & { sub: string },
    expires?: { accessTokenExpiresIn?: number; refreshTokenExpiresIn?: number },
  ) {
    const accessTokenExpiresIn =
      expires?.accessTokenExpiresIn ?? 60 * 60 * 24 * 1;
    const refreshTokenExpiresIn =
      expires?.refreshTokenExpiresIn ?? 60 * 60 * 24 * 7;

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(data, {
        expiresIn: accessTokenExpiresIn,
        secret: this.configService.get('secrets.access_token'),
      }),

      this.jwtService.signAsync(data, {
        expiresIn: refreshTokenExpiresIn,
        secret: this.configService.get('secrets.refresh_token'),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
      accessTokenExpiresIn,
      refreshTokenExpiresIn,
    };
  }
}
