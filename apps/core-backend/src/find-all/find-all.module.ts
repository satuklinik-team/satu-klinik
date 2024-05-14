import { Module } from '@nestjs/common';
import { FindAllService } from './find-all.service';

@Module({
  providers: [FindAllService],
  exports: [FindAllService],
})
export class FindAllModule {}
