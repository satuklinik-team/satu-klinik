import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Activity } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ActivityService {
  constructor(private readonly prismaService: PrismaService) {}

  @OnEvent('**')
  async handleEverything(payload: Activity) {
    const user = await this.prismaService.users.findFirst({
      where: {
        id: payload.usersId,
      },
    });

    await this.prismaService.activity.create({
      data: {
        title: payload.title,
        payload: JSON.stringify(payload.payload),
        usersId: payload.usersId,
        by: user.fullname,
        clinicsId: payload.clinicsId,
        createdAt: payload.createdAt,
      },
    });
  }
}
