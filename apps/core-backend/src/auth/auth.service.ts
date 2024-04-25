import { Injectable } from '@nestjs/common';
import { CryptoService } from 'src/crypto/crypto.service';
import { TokenService } from 'src/token/token.service';
import { UsersService } from 'src/users/users.service';
import { exclude } from 'src/utils';
import { LoginDto, RegisterDto } from './dto';
import {
  IncorrectEmailPasswordException,
  UserNotFoundException,
} from 'src/exceptions';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClinicsService } from 'src/clinics/clinics.service';

@Injectable()
export class AuthService {
  constructor(
    private tokenService: TokenService,
    private userService: UsersService,
    private cryptoService: CryptoService,
    private clinicsService: ClinicsService,
    private prismaService: PrismaService,
  ) {}

  async register(dto: RegisterDto) {
    const clinic = await this.clinicsService.create(dto);
    const user = await this.userService.create(dto, clinic.id);
    const token = await this.tokenService.getAuthToken({ sub: user.id });

    return { user: exclude(user, ['password']), token };
  }

  async login(dto: LoginDto) {
    const user = await this._login(dto);
    const token = await this.tokenService.getAuthToken({
      sub: user.id,
      source: 'browser',
    });

    return { user, token };
  }

  async cliLogin(dto: LoginDto) {
    const user = await this._login(dto);
    const token = await this.tokenService.getAuthToken(
      {
        sub: user.id,
        source: 'cli',
      },
      {
        accessTokenExpiresIn: 60 * 60 * 24 * 7,
        refreshTokenExpiresIn: 60 * 60 * 24 * 8,
      },
    );

    return token;
  }

  private async _isUserNotFound(email: string) {
    const userCount = await this.userService.count({ where: { email } });
    return !userCount;
  }

  private async _isPasswordNotMatch(
    hashedPassword: string,
    rawPassword: string,
  ) {
    const isVerified = await this.cryptoService.verify(
      hashedPassword,
      rawPassword,
    );

    return !isVerified;
  }

  private async _login(dto: LoginDto) {
    if (await this._isUserNotFound(dto.email))
      throw new UserNotFoundException();

    const user = await this.prismaService.users.findUnique({
      where: { email: dto.email },
    });

    if (await this._isPasswordNotMatch(user.password, dto.password))
      throw new IncorrectEmailPasswordException();

    return exclude(user, ['password']);
  }
}
