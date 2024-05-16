/*
  Warnings:

  - You are about to drop the column `medicine` on the `Patient_prescription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patient_prescription" DROP COLUMN "medicine",
ADD COLUMN     "medicineId" INTEGER;

-- AddForeignKey
ALTER TABLE "Patient_prescription" ADD CONSTRAINT "Patient_prescription_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE SET NULL ON UPDATE CASCADE;
