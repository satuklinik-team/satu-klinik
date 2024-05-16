-- AlterTable
ALTER TABLE "MedicineCategory" ADD COLUMN     "clinicsId" UUID;

-- AddForeignKey
ALTER TABLE "MedicineCategory" ADD CONSTRAINT "MedicineCategory_clinicsId_fkey" FOREIGN KEY ("clinicsId") REFERENCES "Clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;
