-- AlterTable
ALTER TABLE "Clinics" ADD COLUMN     "organizationId" TEXT;

-- AlterTable
ALTER TABLE "Poli" ALTER COLUMN "isActive" SET DEFAULT true;
