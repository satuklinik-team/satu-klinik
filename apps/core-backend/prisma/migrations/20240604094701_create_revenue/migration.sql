-- CreateTable
CREATE TABLE "Revenue" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" TEXT NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "Revenue_pkey" PRIMARY KEY ("id")
);
