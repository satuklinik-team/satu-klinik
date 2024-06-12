import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: this.configService.get('email.service'),
      host: this.configService.get('email.host'),
      port: parseInt(this.configService.get('email.port')),
      secure: true,
      auth: {
        user: this.configService.get('email.username'),
        pass: this.configService.get('email.password'),
      },
    });
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const feUrl = this.configService.get('frontend_url');
    const resetLink = `${feUrl}/reset-password?token=${token}`;
    const mailOptions = {
      from: 'SatuKlinik',
      to,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p><p>Your token: ${token}</p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
