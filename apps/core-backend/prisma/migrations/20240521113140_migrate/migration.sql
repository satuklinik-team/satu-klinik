/*
  Warnings:

  - You are about to drop the column `clinicsId` on the `Medicine` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Medicine" DROP CONSTRAINT "Medicine_clinicsId_fkey";

-- AlterTable
ALTER TABLE "Medicine" DROP COLUMN "clinicsId";
