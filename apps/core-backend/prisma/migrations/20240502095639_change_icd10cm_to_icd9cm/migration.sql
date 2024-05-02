/*
  Warnings:

  - You are about to drop the `ICD10CM` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ICD10CM";

-- CreateTable
CREATE TABLE "ICD9CM" (
    "code" TEXT NOT NULL,
    "str" TEXT NOT NULL,
    "sab" TEXT NOT NULL,

    CONSTRAINT "ICD9CM_pkey" PRIMARY KEY ("code")
);
