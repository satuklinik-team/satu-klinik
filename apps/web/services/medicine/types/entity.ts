export interface MedicineEntity {
  id: number;
  title: string;
  price: number;
  stock: number;
  discount: number;
  imageUrl?: string;
  kfaCode?: string;
  categoryId: number;
}
