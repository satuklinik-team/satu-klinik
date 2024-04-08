-- CreateEnum
CREATE TYPE "DAYS_TYPE" AS ENUM ('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturda');

-- AlterTable
ALTER TABLE "Memberships" ALTER COLUMN "activeTo" SET DEFAULT NOW() + interval '1 year';

-- AlterTable
ALTER TABLE "Patient_medical_records" ALTER COLUMN "visitAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Patient_prescription" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "Patient_vital_sign" ALTER COLUMN "visitAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "SubscriptionSchedule" ALTER COLUMN "start_time" SET DEFAULT NOW() + interval '1 day';

-- CreateTable
CREATE TABLE "regularHours" (
    "id" SERIAL NOT NULL,
    "openDay" "DAYS_TYPE" NOT NULL,
    "closeDay" "DAYS_TYPE" NOT NULL,
    "openTime" TEXT NOT NULL DEFAULT '09:00',
    "closeTime" TEXT NOT NULL DEFAULT '17:00',
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "clinicsId" TEXT,

    CONSTRAINT "regularHours_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "regularHours" ADD CONSTRAINT "regularHours_clinicsId_fkey" FOREIGN KEY ("clinicsId") REFERENCES "Clinics"("id") ON DELETE SET NULL ON UPDATE CASCADE;
