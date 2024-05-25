-- CreateTable
CREATE TABLE "SatuSehatError" (
    "id" SERIAL NOT NULL,
    "requestBody" TEXT NOT NULL,
    "responseBody" TEXT NOT NULL,

    CONSTRAINT "SatuSehatError_pkey" PRIMARY KEY ("id")
);
