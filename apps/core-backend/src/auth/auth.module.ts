import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenModule } from 'src/token/token.module';
import { UsersModule } from 'src/users/users.module';
import { CryptoModule } from 'src/crypto/crypto.module';
import { ClinicsModule } from 'src/clinics/clinics.module';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    TokenModule,
    UsersModule,
    CryptoModule,
    ClinicsModule,
    AccountsModule,
  ],
})
export class AuthModule {}
