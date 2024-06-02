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
import { Role } from '@prisma/client';

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
    dto.role = Role.OWNER;
    const data = await this.prismaService.$transaction(async (tx) => {
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

      return { user, clinic };
    });

    const token = await this.tokenService.getAuthToken({
      sub: data.user.id,
      clinicsId: data.clinic.id,
      role: data.user.roles,
    });

    return {
      user: exclude(data.user, ['password']),
      clinic: data.clinic,
      token,
    };
  }

  async login(dto: LoginDto) {
    const data = await this._login(dto);
    const token = await this.tokenService.getAuthToken({
      sub: data.user.id,
      clinicsId: data.clinic.id,
      role: data.user.roles,
      source: 'browser',
    });

    return { user: data.user, clinic: data.clinic, token };
  }

  async cliLogin(dto: LoginDto) {
    const data = await this._login(dto);
    const token = await this.tokenService.getAuthToken(
      {
        sub: data.user.id,
        clinicsId: data.clinic.id,
        role: data.user.roles,
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

    let clinic = await this.prismaService.clinics.findUnique({
      where: { id: user.clinicsId },
    });

    if (
      !clinic.completeCreds &&
      clinic.clientId &&
      clinic.clientSecret &&
      clinic.organizationId &&
      clinic.locationName &&
      clinic.locationSatuSehatId
    ) {
      clinic = await this.prismaService.clinics.update({
        where: { id: user.clinicsId },
        data: {
          completeCreds: true,
        },
      });
    }

    return { user: exclude(user, ['password']), clinic };
  }
}
