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
import { ActivityService } from 'src/activity/activity.service';
import { ActivityTitles } from 'src/activity/dto/activity.dto';
import { exclude } from 'src/utils';

@Injectable()
export class MedicineCategoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly findAllService: FindAllService,
    private readonly activityService: ActivityService,
  ) {}

  async create(dto: CreateMedicineCategoryDto) {
    const medicineCategoryData = exclude(dto, ['usersId']);

    const data = await this.prismaService.medicineCategory.create({
      data: medicineCategoryData,
    });

    this.activityService.emit({
      title: ActivityTitles.CREATE_MEDICINE_CATEGORY,
      clinicsId: dto.clinicsId,
      usersId: dto.usersId,
      payload: medicineCategoryData,
    });

    return data;
  }

  async findAll(dto: FindAllMedicineCategoriesDto) {
    const args: Prisma.MedicineCategoryFindManyArgs = {
      where: {
        clinicsId: dto.clinicsId,
      },
      select: this._findAllSelectFactory(),
      orderBy: {
        createdAt: 'desc',
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
      select: this._findAllSelectFactory(),
    });
  }

  async update(dto: UpdateMedicineCategoryDto) {
    await this.canModifyMedicineCategory(dto.id, dto.clinicsId);

    const data = await this.prismaService.medicineCategory.update({
      where: {
        id: dto.id,
      },
      data: {
        name: dto.name,
      },
    });

    const medicineCategoryData = exclude(dto, ['usersId']);

    this.activityService.emit({
      title: ActivityTitles.UPDATE_MEDICINE_CATEGORY,
      clinicsId: dto.clinicsId,
      usersId: dto.usersId,
      payload: medicineCategoryData,
    });

    return data;
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

    const data = await this.prismaService.medicineCategory.delete({
      where: {
        id: dto.id,
      },
    });

    this.activityService.emit({
      title: ActivityTitles.DELETE_MEDICINE_CATEGORY,
      clinicsId: dto.clinicsId,
      usersId: dto.usersId,
      payload: data,
    });

    return data;
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

  private _findAllSelectFactory(): Prisma.MedicineCategoryFindManyArgs['select'] {
    return {
      id: true,
      name: true,
      clinicsId: true,
      _count: {
        select: {
          Medicine: true,
        },
      },
    };
  }
}
