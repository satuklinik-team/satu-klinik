import { Injectable } from '@nestjs/common';
import { CreateMedicineCategoryDto } from './dto/create-medicine-category.dto';
import { UpdateMedicineCategoryDto } from './dto/update-medicine-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CannotAccessClinicException } from 'src/exceptions/unauthorized/cannot-access-clinic';
import { DeleteMedicineCategoryDto } from './dto/delete-medicine-category.dto';
import { FindAllService } from 'src/find-all/find-all.service';
import { Prisma } from '@prisma/client';
import { FindAllMedicineCategoriesDto } from './dto/find-all-medicine-categories-dto';
import { GetCategoryByIdDto } from './dto/get-category-by-id';
import { MedicineCategoryNotEmptyException } from 'src/exceptions/conflict/medicine-category-not-empty';

@Injectable()
export class MedicineCategoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly findAllService: FindAllService,
  ) {}

  async create(dto: CreateMedicineCategoryDto) {
    return await this.prismaService.medicineCategory.create({
      data: {
        name: dto.name,
        clinicsId: dto.clinicsId,
      },
    });
  }

  async findAll(dto: FindAllMedicineCategoriesDto) {
    const args: Prisma.MedicineCategoryFindManyArgs = {
      where: {
        clinicsId: dto.clinicsId,
      },
    };

    return await this.findAllService.findAll({
      table: this.prismaService.medicineCategory,
      ...args,
      ...dto,
    });
  }

  async findById(dto: GetCategoryByIdDto) {
    await this.canModifyMedicineCategory(dto.id, dto.clinicsId);

    return await this.prismaService.medicineCategory.findFirst({
      where: {
        id: dto.id,
      },
    });
  }

  async update(dto: UpdateMedicineCategoryDto) {
    await this.canModifyMedicineCategory(dto.id, dto.clinicsId);

    return await this.prismaService.medicineCategory.update({
      where: {
        id: dto.id,
      },
      data: {
        name: dto.name,
      },
    });
  }

  async remove(dto: DeleteMedicineCategoryDto) {
    await this.canModifyMedicineCategory(dto.id, dto.clinicsId);

    const medicine = await this.prismaService.medicine.findFirst({
      where: {
        categoryId: dto.id,
      },
    });
    if (medicine) {
      throw new MedicineCategoryNotEmptyException();
    }

    return await this.prismaService.medicineCategory.delete({
      where: {
        id: dto.id,
      },
    });
  }

  async canModifyMedicineCategory(id: number, clinicsId: string) {
    const medicineCategory =
      await this.prismaService.medicineCategory.findFirst({
        where: {
          id,
        },
        select: {
          clinicsId: true,
        },
      });

    if (medicineCategory.clinicsId !== clinicsId) {
      throw new CannotAccessClinicException();
    }
  }
}
