/*
  Warnings:

  - You are about to drop the column `identifier` on the `Clinics` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Clinics` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `Clinics` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Clinics` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `icd9` on the `Patient_assessment` table. All the data in the column will be lost.
  - You are about to drop the column `encounter` on the `Patient_medical_records` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `Patient_medical_records` table. All the data in the column will be lost.
  - You are about to drop the column `identifier` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `practitioner` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Clinics" DROP COLUMN "identifier",
DROP COLUMN "latitude",
DROP COLUMN "locationId",
DROP COLUMN "longitude";

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "identifier";

-- AlterTable
ALTER TABLE "Patient_assessment" DROP COLUMN "icd9";

-- AlterTable
ALTER TABLE "Patient_medical_records" DROP COLUMN "encounter",
DROP COLUMN "identifier";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "identifier",
DROP COLUMN "practitioner";
