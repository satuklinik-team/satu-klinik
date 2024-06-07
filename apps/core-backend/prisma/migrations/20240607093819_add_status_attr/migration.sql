-- AlterTable
ALTER TABLE "Medication_dispense" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'completed';

-- AlterTable
ALTER TABLE "Patient_prescription" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'completed';
