/*
  Warnings:

  - You are about to drop the column `medicineId` on the `Medication_dispense` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Medication_dispense" DROP CONSTRAINT "Medication_dispense_medicineId_fkey";

-- AlterTable
ALTER TABLE "Medication_dispense" DROP COLUMN "medicineId";
