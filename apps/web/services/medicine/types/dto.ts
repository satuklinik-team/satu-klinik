export interface CreateMedicineDto {
  image: object;
  title: string;
  price: number;
  stock: number;
  discount: number;
  categoryId: string;
}

export type UpdateMedicineDto = Partial<CreateMedicineDto>;
