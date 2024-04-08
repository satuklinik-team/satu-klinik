import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Public, TokenData } from 'src/utils';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtPayload } from './types';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  async register(@Body() dto: RegisterDto, @Res() res: Response) {
    const data = await this.authService.register(dto);

    res.cookie('__accessToken', data.token.accessToken, {
      maxAge: data.token.accessTokenExpiresIn * 1000,
      httpOnly: true,
    });
    res.cookie('__refreshToken', data.token.refreshToken, {
      maxAge: data.token.refreshTokenExpiresIn * 1000,
      httpOnly: true,
    });

    return res.json({
      user: data.user,
      token: data.token.accessToken,
      expiresIn: data.token.accessTokenExpiresIn,
    });
  }

  @Post('login')
  @Public()
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const data = await this.authService.login(dto);

    res.cookie('__accessToken', data.token.accessToken, {
      maxAge: data.token.accessTokenExpiresIn * 1000,
      httpOnly: true,
    });
    res.cookie('__refreshToken', data.token.refreshToken, {
      maxAge: data.token.refreshTokenExpiresIn * 1000,
      httpOnly: true,
    });

    return res.json({
      user: data.user,
      token: data.token.accessToken,
      expiresIn: data.token.accessTokenExpiresIn,
    });
  }

  @Post('logout')
  @Public()
  async logout(@Res() res: Response) {
    res.clearCookie('__accessToken');
    res.clearCookie('__refreshToken');

    return res.json({ user: null, token: null, expiresIn: null });
  }

  @Get('verify')
  async verify(@TokenData() tokenData: JwtPayload) {
    return tokenData;
  }
}
