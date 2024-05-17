/*
  Warnings:

  - You are about to drop the `Doctor_Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Pharmacy_Task" ADD COLUMN     "createdDate" TEXT;

-- DropTable
DROP TABLE "Doctor_Task";
