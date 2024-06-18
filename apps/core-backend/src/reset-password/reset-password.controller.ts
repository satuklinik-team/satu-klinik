import { Body, Controller, Patch, Post, Put } from '@nestjs/common';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordService } from './reset-password.service';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('reset-password')
export class ResetPasswordController {
  constructor(private resetPasswordService: ResetPasswordService) {}

  @Post()
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.resetPasswordService.forgotPassword(dto.email);
  }

  @Patch()
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.resetPasswordService.resetPassword(
      dto.newPassword,
      dto.resetToken,
    );
  }
}
