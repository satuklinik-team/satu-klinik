import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get('email.send_grid_key'));
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const feUrl = this.configService.get('frontend_url');
    const resetLink = `${feUrl}/auth/reset-password?token=${token}`;

    const debugEmail = this.configService.get('email.debug_email');
    if (debugEmail) {
      to = debugEmail;
    }

    const mail: SendGrid.MailDataRequired = {
      to,
      subject: 'Password Reset Request',
      from: this.configService.get('email.username'),
      html: `<p>You requested a password reset on SatuKlinik. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p><p>Your token: ${token}</p>`,
    };

    return await SendGrid.send(mail);
  }
}
