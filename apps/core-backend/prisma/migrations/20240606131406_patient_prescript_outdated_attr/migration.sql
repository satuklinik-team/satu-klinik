-- AlterTable
ALTER TABLE "Patient_prescription" ADD COLUMN     "outdated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "syncedWithSatuSehat" BOOLEAN NOT NULL DEFAULT false;
