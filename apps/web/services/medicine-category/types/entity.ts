export interface MedicineCategoryEntity {
  id: number;
  name: string;
  clinicsId: string;
  _count: {
    Medicine: number;
  };
}
