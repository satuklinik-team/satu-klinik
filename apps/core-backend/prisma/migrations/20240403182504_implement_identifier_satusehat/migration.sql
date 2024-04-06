-- AlterTable
ALTER TABLE "Clinics" ADD COLUMN     "identifier" TEXT DEFAULT '-',
ADD COLUMN     "latitude" TEXT,
ADD COLUMN     "locationId" TEXT DEFAULT '-',
ADD COLUMN     "longitude" TEXT;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "identifier" TEXT DEFAULT '-';

-- AlterTable
ALTER TABLE "Patient_medical_records" ADD COLUMN     "encounter" TEXT DEFAULT '-',
ADD COLUMN     "identifier" TEXT DEFAULT '-';

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "identifier" TEXT NOT NULL DEFAULT '-',
ADD COLUMN     "practitioner" TEXT NOT NULL DEFAULT '-';
