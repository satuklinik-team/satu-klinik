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
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class AuthService {
  constructor(
    private tokenService: TokenService,
    private usersService: UsersService,
    private cryptoService: CryptoService,
    private clinicsService: ClinicsService,
    private prismaService: PrismaService,
    private accountsService: AccountsService,
  ) {}

  async register(dto: RegisterDto) {
    const user = await this.prismaService.$transaction(async (tx) => {
      let user = await this.usersService.create(dto, { tx });
      const account = await this.accountsService.create(
        { usersId: user.id },
        { tx },
      );
      const clinic = await this.clinicsService.create(
        {
          ...dto,
          accountsId: account.id,
        },
        { tx },
      );
      user = await this.usersService.changeClinicId(
        {
          usersId: user.id,
          clinicsId: clinic.id,
        },
        { tx },
      );

      return user;
    });

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
    const userCount = await this.usersService.count({ where: { email } });
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
