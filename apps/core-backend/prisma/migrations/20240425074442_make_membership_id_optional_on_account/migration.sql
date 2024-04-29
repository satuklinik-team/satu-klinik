/*
  Warnings:

  - You are about to drop the column `accountsMemberId` on the `Clinics` table. All the data in the column will be lost.
  - You are about to drop the `AccountsMember` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Accounts" DROP CONSTRAINT "Accounts_membershipsId_fkey";

-- DropForeignKey
ALTER TABLE "AccountsMember" DROP CONSTRAINT "AccountsMember_accountsId_fkey";

-- DropForeignKey
ALTER TABLE "Clinics" DROP CONSTRAINT "Clinics_accountsMemberId_fkey";

-- AlterTable
ALTER TABLE "Accounts" ALTER COLUMN "membershipsId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Clinics" DROP COLUMN "accountsMemberId",
ADD COLUMN     "accountsId" UUID;

-- DropTable
DROP TABLE "AccountsMember";

-- AddForeignKey
ALTER TABLE "Clinics" ADD CONSTRAINT "Clinics_accountsId_fkey" FOREIGN KEY ("accountsId") REFERENCES "Accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_membershipsId_fkey" FOREIGN KEY ("membershipsId") REFERENCES "Memberships"("id") ON DELETE SET NULL ON UPDATE CASCADE;
