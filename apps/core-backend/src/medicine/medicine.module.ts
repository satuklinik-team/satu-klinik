import { Module } from '@nestjs/common';
import { MedicineController } from './medicine.controller';
import { MedicineService } from './medicine.service';
import { MinioClientModule } from 'src/minio-client/minio-client.module';
import { MedicineCategoryModule } from 'src/medicine-category/medicine-category.module';
import { FindAllModule } from 'src/find-all/find-all.module';

@Module({
  imports: [MinioClientModule, MedicineCategoryModule, FindAllModule],
  controllers: [MedicineController],
  providers: [MedicineService],
  exports: [MedicineService],
})
export class MedicineModule {}
