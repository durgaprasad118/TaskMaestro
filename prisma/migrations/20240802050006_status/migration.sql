-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Backlog', 'Progress', 'Todo', 'Done');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Todo';
