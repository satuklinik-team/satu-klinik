/*
  Warnings:

  - You are about to drop the column `icd10` on the `Patient_assessment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Patient_assessment" DROP COLUMN "icd10",
ADD COLUMN     "icd10Code" TEXT,
ADD COLUMN     "icd9CMCode" TEXT;

-- AddForeignKey
ALTER TABLE "Patient_assessment" ADD CONSTRAINT "Patient_assessment_icd10Code_fkey" FOREIGN KEY ("icd10Code") REFERENCES "ICD10"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient_assessment" ADD CONSTRAINT "Patient_assessment_icd9CMCode_fkey" FOREIGN KEY ("icd9CMCode") REFERENCES "ICD9CM"("code") ON DELETE SET NULL ON UPDATE CASCADE;
