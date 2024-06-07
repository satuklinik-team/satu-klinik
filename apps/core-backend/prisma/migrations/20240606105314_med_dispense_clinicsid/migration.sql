-- AlterTable
ALTER TABLE "Medication_dispense" ADD COLUMN     "clinicsId" UUID;

-- AddForeignKey
ALTER TABLE "Medication_dispense" ADD CONSTRAINT "Medication_dispense_clinicsId_fkey" FOREIGN KEY ("clinicsId") REFERENCES "Clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;
