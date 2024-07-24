/*
  Warnings:

  - You are about to drop the `subTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "subTask" DROP CONSTRAINT "subTask_subId_fkey";

-- DropTable
DROP TABLE "subTask";

-- CreateTable
CREATE TABLE "SubTask" (
    "subId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "taskId" TEXT NOT NULL,

    CONSTRAINT "SubTask_pkey" PRIMARY KEY ("subId")
);

-- AddForeignKey
ALTER TABLE "SubTask" ADD CONSTRAINT "SubTask_subId_fkey" FOREIGN KEY ("subId") REFERENCES "Task"("taskId") ON DELETE CASCADE ON UPDATE CASCADE;
