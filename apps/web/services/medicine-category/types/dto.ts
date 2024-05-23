export interface CreateMedicineCategoryDto {
  name: string;
}

export type UpdateMedicineCategoryDto = Partial<CreateMedicineCategoryDto>;
