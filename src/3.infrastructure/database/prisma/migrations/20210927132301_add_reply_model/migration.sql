-- CreateTable
CREATE TABLE "Reply" (
    "reviewId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("reviewId")
);
