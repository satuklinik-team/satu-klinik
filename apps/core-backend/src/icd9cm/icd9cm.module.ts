import { Module } from '@nestjs/common';
import { Icd9cmService } from './icd9cm.service';
import { Icd9cmController } from './icd9cm.controller';
import { FindAllModule } from 'src/find-all/find-all.module';

@Module({
  imports: [FindAllModule],
  controllers: [Icd9cmController],
  providers: [Icd9cmService],
})
export class Icd9cmModule {}
