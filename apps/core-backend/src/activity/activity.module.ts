import { Global, Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';

@Global()
@Module({
  providers: [ActivityService],
  exports: [ActivityService],
  controllers: [ActivityController],
})
export class ActivityModule {}
