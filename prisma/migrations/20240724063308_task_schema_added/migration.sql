-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('P1', 'P2', 'P3');

-- CreateTable
CREATE TABLE "Task" (
    "taskId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "label" TEXT[],
    "priority" "Priority" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("taskId")
);

-- CreateTable
CREATE TABLE "subTask" (
    "subId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "todoId" INTEGER NOT NULL,

    CONSTRAINT "subTask_pkey" PRIMARY KEY ("subId")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subTask" ADD CONSTRAINT "subTask_subId_fkey" FOREIGN KEY ("subId") REFERENCES "Task"("taskId") ON DELETE CASCADE ON UPDATE CASCADE;
