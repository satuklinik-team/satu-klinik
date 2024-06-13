import { Module } from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordController } from './reset-password.controller';
import { MailModule } from 'src/mail/mail.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [MailModule, UsersModule],
  providers: [ResetPasswordService],
  controllers: [ResetPasswordController],
})
export class ResetPasswordModule {}
