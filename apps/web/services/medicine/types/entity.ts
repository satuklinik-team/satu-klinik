export interface MedicineEntity {
  id: string;
  title: string;
  price: number;
  stock: number;
  discount: number;
  imageUrl: string;
  kfaCode: string;
  categoryId: number;
}
