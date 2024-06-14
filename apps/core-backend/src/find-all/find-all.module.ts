import { Global, Module } from '@nestjs/common';
import { FindAllService } from './find-all.service';

@Global()
@Module({
  providers: [FindAllService],
  exports: [FindAllService],
})
export class FindAllModule {}
