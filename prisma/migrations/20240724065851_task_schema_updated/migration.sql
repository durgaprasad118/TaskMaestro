/*
  Warnings:

  - You are about to drop the column `label` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "label",
ADD COLUMN     "labels" TEXT[];
