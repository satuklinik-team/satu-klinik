/*
  Warnings:

  - You are about to drop the column `bought` on the `Patient_prescription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patient_prescription" DROP COLUMN "bought";

-- CreateTable
CREATE TABLE "Medication_dispense" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "medicineId" INTEGER,
    "type" TEXT,
    "frequency" INTEGER,
    "period" INTEGER,
    "doseQuantity" INTEGER,
    "totalQuantity" INTEGER,
    "supplyDuration" INTEGER,
    "notes" TEXT,
    "satuSehatId" TEXT,
    "deletedAt" TIMESTAMP(3),
    "patient_prescriptionId" INTEGER,

    CONSTRAINT "Medication_dispense_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Medication_dispense" ADD CONSTRAINT "Medication_dispense_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication_dispense" ADD CONSTRAINT "Medication_dispense_patient_prescriptionId_fkey" FOREIGN KEY ("patient_prescriptionId") REFERENCES "Patient_prescription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
