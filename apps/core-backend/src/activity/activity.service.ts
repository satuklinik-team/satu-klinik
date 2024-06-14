import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Activity } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivityDTO } from './dto/activity.dto';

@Injectable()
export class ActivityService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent('activity.new')
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

  async emit(dto: ActivityDTO) {
    this.eventEmitter.emit('activity.new', {
      ...dto,
      createdAt: new Date(),
    });
  }
}
