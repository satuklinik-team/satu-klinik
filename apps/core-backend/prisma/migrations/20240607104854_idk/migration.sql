/*
  Warnings:

  - You are about to drop the column `includeInPharmacyTask` on the `Pharmacy_Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patient_prescription" ADD COLUMN     "includeInPharmacyTask" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Pharmacy_Task" DROP COLUMN "includeInPharmacyTask";
