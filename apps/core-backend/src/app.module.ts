import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './auth/guards';
import { ClinicsModule } from './clinics/clinics.module';
import configuration from './config/configuration';
import { CryptoModule } from './crypto/crypto.module';
import { Icd10Module } from './icd10/icd10.module';
import { PatientsVitalSignsModule } from './patients-vital-signs/patients-vital-signs.module';
import { PatientsModule } from './patients/patients.module';
import { PrismaModule } from './prisma/prisma.module';
import { SatusehatOauthModule } from './satusehat-oauth/satusehat-oauth.module';
import { SatusehatOrganizationModule } from './satusehat-organization/satusehat-organization.module';
import { SatusehatModule } from './satusehat/satusehat.module';
import { TokenModule } from './token/token.module';
import { UsersModule } from './users/users.module';
import { PatientAssessmentModule } from './patient-assessment/patient-assessment.module';
import { Icd9cmModule } from './icd9cm/icd9cm.module';
import { PharmacyTasksModule } from './pharmacy-tasks/pharmacy-tasks.module';
import { FindAllService } from './find-all/find-all.service';
import { FindAllModule } from './find-all/find-all.module';
import { SettingsModule } from './settings/settings.module';
import { DepartmentsModule } from './departments/departments.module';

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
    PatientsModule,
    PatientsVitalSignsModule,
    AccountsModule,
    PatientAssessmentModule,
    Icd9cmModule,
    PharmacyTasksModule,
    FindAllModule,
    SettingsModule,
    DepartmentsModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AccessTokenGuard }],
})
export class AppModule {}
