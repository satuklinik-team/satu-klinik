/*
  Warnings:

  - Added the required column `clinicsId` to the `Revenue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Revenue" ADD COLUMN     "clinicsId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Revenue" ADD CONSTRAINT "Revenue_clinicsId_fkey" FOREIGN KEY ("clinicsId") REFERENCES "Clinics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
