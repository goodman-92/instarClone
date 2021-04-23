/*
  Warnings:

  - You are about to drop the column `craetedAt` on the `HashTag` table. All the data in the column will be lost.
  - You are about to drop the column `craetedAt` on the `Photo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hashtag]` on the table `HashTag` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "HashTag" DROP COLUMN "craetedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "craetedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "HashTag.hashtag_unique" ON "HashTag"("hashtag");
