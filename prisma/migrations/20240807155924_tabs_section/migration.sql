-- CreateEnum
CREATE TYPE "TabSection" AS ENUM ('Tasks', 'Calendar');

-- CreateTable
CREATE TABLE "Tab" (
    "id" INTEGER NOT NULL,
    "tab" "TabSection" NOT NULL DEFAULT 'Tasks',

    CONSTRAINT "Tab_pkey" PRIMARY KEY ("id")
);
