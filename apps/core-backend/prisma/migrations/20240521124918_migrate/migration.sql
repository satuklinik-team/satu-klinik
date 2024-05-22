/*
  Warnings:

  - You are about to drop the column `dosage` on the `Patient_prescription` table. All the data in the column will be lost.
  - You are about to drop the column `interval` on the `Patient_prescription` table. All the data in the column will be lost.
  - You are about to drop the column `usage` on the `Patient_prescription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patient_prescription" DROP COLUMN "dosage",
DROP COLUMN "interval",
DROP COLUMN "usage",
ADD COLUMN     "doseQuantity" INTEGER,
ADD COLUMN     "frequency" INTEGER,
ADD COLUMN     "period" INTEGER,
ADD COLUMN     "supplyDuration" INTEGER,
ALTER COLUMN "quantity" DROP NOT NULL;
