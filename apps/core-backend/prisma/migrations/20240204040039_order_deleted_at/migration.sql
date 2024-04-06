-- AlterTable
ALTER TABLE "Memberships" ADD COLUMN     "afterDiscount" INTEGER DEFAULT 0,
ADD COLUMN     "discount" INTEGER DEFAULT 0,
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "activeTo" SET DEFAULT NOW() + interval '1 year',
ALTER COLUMN "days" SET DEFAULT 30;

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "deletedAt" TIMESTAMPTZ(6);

-- AlterTable
ALTER TABLE "SubscriptionSchedule" ALTER COLUMN "start_time" SET DEFAULT NOW() + interval '1 day';
