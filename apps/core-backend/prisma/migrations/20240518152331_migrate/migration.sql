/*
  Warnings:

  - You are about to drop the column `doctor` on the `Patient_medical_records` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patient_medical_records" DROP COLUMN "doctor",
ADD COLUMN     "encounterId" TEXT;
