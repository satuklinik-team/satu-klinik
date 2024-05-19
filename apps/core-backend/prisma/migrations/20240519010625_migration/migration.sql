/*
  Warnings:

  - You are about to alter the column `height` on the `Patient_vital_sign` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `weight` on the `Patient_vital_sign` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `temperature` on the `Patient_vital_sign` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `sugar` on the `Patient_vital_sign` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `cholesterol` on the `Patient_vital_sign` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Patient_vital_sign" ALTER COLUMN "height" SET DEFAULT 0,
ALTER COLUMN "height" SET DATA TYPE INTEGER,
ALTER COLUMN "weight" SET DEFAULT 0,
ALTER COLUMN "weight" SET DATA TYPE INTEGER,
ALTER COLUMN "temperature" DROP NOT NULL,
ALTER COLUMN "temperature" SET DEFAULT 0,
ALTER COLUMN "temperature" SET DATA TYPE INTEGER,
ALTER COLUMN "sugar" SET DEFAULT 0,
ALTER COLUMN "sugar" SET DATA TYPE INTEGER,
ALTER COLUMN "cholesterol" SET DEFAULT 0,
ALTER COLUMN "cholesterol" SET DATA TYPE INTEGER;
