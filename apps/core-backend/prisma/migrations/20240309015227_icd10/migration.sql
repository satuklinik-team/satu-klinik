-- AlterTable
ALTER TABLE "Patient_assessment" ADD COLUMN     "icd10" TEXT NOT NULL DEFAULT '-';

-- CreateTable
CREATE TABLE "ICD10" (
    "code" TEXT NOT NULL,
    "strt" TEXT NOT NULL,
    "sab" TEXT NOT NULL,

    CONSTRAINT "ICD10_pkey" PRIMARY KEY ("code")
);
