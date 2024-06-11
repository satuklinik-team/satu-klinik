import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { MailService } from 'src/mail/mail.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { IncorrectTokenException } from 'src/exceptions/unauthorized/incorrect-token';
import { UsersService } from 'src/users/users.service';
import { exclude } from 'src/utils';

@Injectable()
export class ResetPasswordService {
  constructor(
    private prismaService: PrismaService,
    private mailService: MailService,
    private usersService: UsersService,
  ) {}

  async forgotPassword(email: string) {
    const user = await this.prismaService.users.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const resetToken = nanoid();
      await this.prismaService.users.update({
        where: {
          id: user.id,
        },
        data: {
          reset_password_token: resetToken,
          reset_expiry_date: expiryDate,
        },
      });

      await this.mailService.sendPasswordResetEmail(email, resetToken);
    }

    return { message: 'If this user exists, they will receive an email' };
  }

  async resetPassword(newPassword: string, resetToken: string) {
    let user = await this.prismaService.users.findFirst({
      where: {
        reset_password_token: resetToken,
        reset_expiry_date: {
          gte: new Date(),
        },
      },
    });

    if (!user) {
      throw new IncorrectTokenException();
    }

    user = await this.prismaService.users.update({
      where: {
        id: user.id,
      },
      data: {
        password: await this.usersService.getHashedPassword(newPassword),
      },
    });

    return exclude(user, ['password']);
  }
}
