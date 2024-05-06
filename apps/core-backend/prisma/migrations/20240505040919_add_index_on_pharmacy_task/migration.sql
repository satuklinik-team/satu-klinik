-- DropIndex
DROP INDEX "Pharmacy_Task_clinicsId_idx";

-- CreateIndex
CREATE INDEX "Pharmacy_Task_clinicsId_assessmentReffId_idx" ON "Pharmacy_Task"("clinicsId", "assessmentReffId");
