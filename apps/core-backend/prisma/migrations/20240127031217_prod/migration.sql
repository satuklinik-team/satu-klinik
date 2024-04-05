-- AlterTable
ALTER TABLE "Memberships" ALTER COLUMN "activeTo" SET DEFAULT NOW() + interval '1 year';

-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "age" SET DEFAULT 0,
ALTER COLUMN "blood" SET DEFAULT '-';

-- AlterTable
ALTER TABLE "Patient_vital_sign" ALTER COLUMN "height" SET DEFAULT 0,
ALTER COLUMN "weight" SET DEFAULT 0,
ALTER COLUMN "temperature" SET DEFAULT 0,
ALTER COLUMN "systole" SET DEFAULT 0,
ALTER COLUMN "diastole" SET DEFAULT 0,
ALTER COLUMN "pulse" SET DEFAULT 0,
ALTER COLUMN "respiration" SET DEFAULT 0,
ALTER COLUMN "saturation" SET DEFAULT 0,
ALTER COLUMN "sugar" SET DEFAULT 0,
ALTER COLUMN "cholesterol" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "SubscriptionSchedule" ALTER COLUMN "start_time" SET DEFAULT NOW() + interval '1 day';
