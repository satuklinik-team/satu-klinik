import { Module } from '@nestjs/common';
import { MedicineCategoryService } from './medicine-category.service';
import { MedicineCategoryController } from './medicine-category.controller';

@Module({
  controllers: [MedicineCategoryController],
  providers: [MedicineCategoryService],
  exports: [MedicineCategoryService],
})
export class MedicineCategoryModule {}
