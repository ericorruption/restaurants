/*
  Warnings:

  - A unique constraint covering the columns `[reviewId]` on the table `Reply` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_replyId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Reply_reviewId_unique" ON "Reply"("reviewId");

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
