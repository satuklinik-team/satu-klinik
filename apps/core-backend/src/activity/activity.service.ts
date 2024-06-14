import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Activity, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivityDTO } from './dto/activity.dto';
import { FindAllActivityDto } from './dto/find-all-activity.dto';
import { FindAllService } from 'src/find-all/find-all.service';

@Injectable()
export class ActivityService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventEmitter: EventEmitter2,
    private readonly findAllService: FindAllService,
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

  async findAll(dto: FindAllActivityDto) {
    const args: Prisma.ActivityFindManyArgs = {
      where: {
        clinicsId: dto.clinicsId,
      },
    };

    return await this.findAllService.findAll({
      table: this.prismaService.activity,
      ...args,
      ...dto,
    });
  }
}
