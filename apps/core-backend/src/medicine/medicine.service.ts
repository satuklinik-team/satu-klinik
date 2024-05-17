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

@Injectable()
export class MedicineService {
  constructor(
    private minioClientService: MinioClientService,
    private readonly prismaService: PrismaService,
    private readonly medicineCategoryService: MedicineCategoryService,
    private readonly findAllService: FindAllService,
  ) {}

  async create(dto: CreateMedicineDto) {
    await this.medicineCategoryService.canModifyMedicineCategory(
      dto.categoryId,
      dto.clinicsId,
    );

    const uploadedImage = await this.minioClientService.upload(dto.image);

    return await this.prismaService.medicine.create({
      data: {
        title: dto.title,
        price: dto.price,
        stock: dto.stock,
        discount: dto.discount,
        categoryId: dto.categoryId,
        imageUrl: uploadedImage.url,
      },
    });
  }

  async update(dto: UpdateMedicineDto) {
    this.canModifyMedicine(dto.id, dto.clinicsId);

    await this.medicineCategoryService.canModifyMedicineCategory(
      dto.categoryId,
      dto.clinicsId,
    );

    let uploadedImage = null;
    if (dto.image) {
      uploadedImage = await this.minioClientService.upload(dto.image);
    }

    return await this.prismaService.medicine.update({
      where: {
        id: dto.id,
      },
      data: {
        title: dto.title,
        price: dto.price,
        stock: dto.stock,
        discount: dto.discount,
        categoryId: dto.categoryId,
        imageUrl: uploadedImage.url,
      },
    });
  }

  async delete(dto: DeleteMedicineDto) {
    this.canModifyMedicine(dto.id, dto.clinicsId);

    return await this.prismaService.medicine.delete({
      where: {
        id: dto.id,
      },
    });
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
      where: { id: id },
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
