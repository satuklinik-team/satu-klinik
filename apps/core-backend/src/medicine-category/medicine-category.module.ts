import { Module } from '@nestjs/common';
import { MedicineCategoryService } from './medicine-category.service';
import { MedicineCategoryController } from './medicine-category.controller';
import { FindAllModule } from 'src/find-all/find-all.module';

@Module({
  imports: [FindAllModule],
  controllers: [MedicineCategoryController],
  providers: [MedicineCategoryService],
  exports: [MedicineCategoryService],
})
export class MedicineCategoryModule {}
