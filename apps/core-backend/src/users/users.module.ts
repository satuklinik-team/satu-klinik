import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CryptoModule } from 'src/crypto/crypto.module';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  imports: [PrismaModule, CryptoModule],
})
export class UsersModule {}
