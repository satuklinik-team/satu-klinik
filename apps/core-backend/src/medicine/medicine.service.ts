import { Injectable } from '@nestjs/common';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { BufferedFile } from 'src/minio-client/model/file.model';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MedicineCategoryService } from 'src/medicine-category/medicine-category.service';
import { FindAllIMedicineDto } from './dto/find-all-medicine-dto';
import { Prisma } from '@prisma/client';
import { FindAllService } from 'src/find-all/find-all.service';
import { UpdateMedicineDto } from './dto/update-medicine-dto';
import { DeleteMedicineDto } from './dto/delete-medicine-dto';
import { GetMedicineByIdDto } from './dto/get-medicine-by-id';
import { ActivityService } from 'src/activity/activity.service';
import { ActivityTitles } from 'src/activity/dto/activity.dto';
import { exclude } from 'src/utils';
import { createMedicineData } from './dto/factory.dto';

@Injectable()
export class MedicineService {
  constructor(
    private minioClientService: MinioClientService,
    private readonly prismaService: PrismaService,
    private readonly medicineCategoryService: MedicineCategoryService,
    private readonly findAllService: FindAllService,
    private readonly activityService: ActivityService,
  ) {}

  async create(dto: CreateMedicineDto) {
    await this.medicineCategoryService.canModifyMedicineCategory(
      dto.categoryId,
      dto.clinicsId,
    );

    let uploadedImage = null;
    if (dto.image) {
      uploadedImage = await this.minioClientService.upload(dto.image);
    }

    const medicineData = createMedicineData(dto, uploadedImage?.url);

    const data = await this.prismaService.medicine.create({
      data: medicineData,
    });

    this.activityService.emit({
      title: ActivityTitles.CREATE_MEDICINE,
      clinicsId: dto.clinicsId,
      usersId: dto.usersId,
      payload: medicineData,
    });

    return data;
  }

  async update(dto: UpdateMedicineDto) {
    await this.canModifyMedicine(dto.id, dto.clinicsId);

    await this.medicineCategoryService.canModifyMedicineCategory(
      dto.categoryId,
      dto.clinicsId,
    );

    let uploadedImage = null;
    if (dto.image) {
      uploadedImage = await this.minioClientService.upload(dto.image);
    }

    const medicineData = createMedicineData(dto, uploadedImage?.url);

    const data = await this.prismaService.medicine.update({
      where: {
        id: dto.id,
      },
      data: medicineData,
    });

    this.activityService.emit({
      title: ActivityTitles.UPDATE_MEDICINE,
      clinicsId: dto.clinicsId,
      usersId: dto.usersId,
      payload: {
        id: dto.id,
        ...medicineData,
      },
    });

    return data;
  }

  async delete(dto: DeleteMedicineDto) {
    await this.canModifyMedicine(dto.id, dto.clinicsId);

    const data = await this.prismaService.medicine.delete({
      where: {
        id: dto.id,
      },
    });

    this.activityService.emit({
      title: ActivityTitles.DELETE_MEDICINE,
      clinicsId: dto.clinicsId,
      usersId: dto.usersId,
      payload: data,
    });

    return data;
  }

  async findAll(dto: FindAllIMedicineDto) {
    const args: Prisma.MedicineFindManyArgs = {
      where: this._findAllWhereFactory(dto),
    };

    return await this.findAllService.findAll({
      table: this.prismaService.medicine,
      ...args,
      ...dto,
    });
  }

  async findById(dto: GetMedicineByIdDto) {
    await this.canModifyMedicine(dto.id, dto.clinicsId);

    return await this.prismaService.medicine.findFirst({
      where: {
        id: dto.id,
      },
    });
  }

  private _findAllWhereFactory(
    dto: FindAllIMedicineDto,
  ): Prisma.MedicineFindManyArgs['where'] {
    if (!dto.categoryId) {
      return {
        category: {
          clinicsId: dto.clinicsId,
        },
        title: {
          contains: dto.search,
          mode: 'insensitive',
        },
      };
    }
    return {
      category: {
        id: dto.categoryId,
        clinicsId: dto.clinicsId,
      },
    };
  }

  async canModifyMedicine(id: number, clinicsId: string) {
    const medicine = await this.prismaService.medicine.findFirst({
      where: { id },
      select: {
        categoryId: true,
      },
    });

    await this.medicineCategoryService.canModifyMedicineCategory(
      medicine.categoryId,
      clinicsId,
    );
  }
}
