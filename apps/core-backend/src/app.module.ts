import { Module } from '@nestjs/common';
import { Icd10Module } from './icd10/icd10.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TokenModule } from './token/token.module';
import { CryptoModule } from './crypto/crypto.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guards';
import { UsersModule } from './users/users.module';
import { SatusehatModule } from './satusehat/satusehat.module';
import { SatusehatOrganizationModule } from './satusehat-organization/satusehat-organization.module';
import { ClinicsModule } from './clinics/clinics.module';
import { SatusehatOauthModule } from './satusehat-oauth/satusehat-oauth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    Icd10Module,
    PrismaModule,
    AuthModule,
    TokenModule,
    CryptoModule,
    UsersModule,
    SatusehatModule,
    SatusehatOrganizationModule,
    ClinicsModule,
    SatusehatOauthModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: AccessTokenGuard }],
})
export class AppModule {}
