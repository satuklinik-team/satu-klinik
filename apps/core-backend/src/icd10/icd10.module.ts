import { Module } from '@nestjs/common';
import { Icd10Service } from './icd10.service';
import { Icd10Controller } from './icd10.controller';
import { FindAllModule } from 'src/find-all/find-all.module';

@Module({
  imports: [FindAllModule],
  controllers: [Icd10Controller],
  providers: [Icd10Service],
})
export class Icd10Module {}
