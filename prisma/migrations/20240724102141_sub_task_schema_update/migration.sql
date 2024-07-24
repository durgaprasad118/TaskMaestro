/*
  Warnings:

  - The primary key for the `SubTask` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `subId` on the `SubTask` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `SubTask` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SubTask" DROP CONSTRAINT "SubTask_subId_fkey";

-- AlterTable
ALTER TABLE "SubTask" DROP CONSTRAINT "SubTask_pkey",
DROP COLUMN "subId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "taskId" DROP NOT NULL,
ADD CONSTRAINT "SubTask_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "SubTask" ADD CONSTRAINT "SubTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
