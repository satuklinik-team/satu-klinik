/*
  Warnings:

  - You are about to drop the column `quantity` on the `Patient_prescription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patient_prescription" DROP COLUMN "quantity",
ADD COLUMN     "totalQuantity" INTEGER;
