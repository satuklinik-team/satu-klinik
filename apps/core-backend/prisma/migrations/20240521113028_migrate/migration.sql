-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "clinicsId" UUID;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_clinicsId_fkey" FOREIGN KEY ("clinicsId") REFERENCES "Clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;
