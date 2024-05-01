/*
  Warnings:

  - You are about to drop the column `norm` on the `Patient_medical_records` table. All the data in the column will be lost.
  - You are about to drop the column `visitAt` on the `Patient_vital_sign` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patient_medical_records" DROP COLUMN "norm";

-- AlterTable
ALTER TABLE "Patient_vital_sign" DROP COLUMN "visitAt";
