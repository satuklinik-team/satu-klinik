-- AlterTable
ALTER TABLE "Departments" ADD COLUMN     "clinicsId" UUID,
ADD COLUMN     "currentDate" TEXT;

-- AddForeignKey
ALTER TABLE "Departments" ADD CONSTRAINT "Departments_clinicsId_fkey" FOREIGN KEY ("clinicsId") REFERENCES "Clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;
