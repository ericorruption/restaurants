/*
  Warnings:

  - The primary key for the `Reply` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `Reply` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_pkey",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Reply_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "replyId" TEXT;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Reply"("id") ON DELETE SET NULL ON UPDATE CASCADE;
