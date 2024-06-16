import { Prisma } from '@prisma/client';
import { UpdateMedicineDto } from './update-medicine-dto';

export function createMedicineData(
  dto: UpdateMedicineDto,
  uploadedImageUrl?: string,
) {
  return {
    title: dto.title,
    price: dto.price,
    stock: dto.stock,
    discount: dto.discount,
    categoryId: dto.categoryId,
    kfaCode: dto.kfaCode,
    imageUrl: uploadedImageUrl,
  };
}
