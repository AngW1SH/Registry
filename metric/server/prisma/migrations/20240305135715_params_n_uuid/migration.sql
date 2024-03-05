/*
  Warnings:

  - You are about to drop the column `data` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `ResourceMetric` table. All the data in the column will be lost.
  - You are about to drop the column `updateRate` on the `ResourceMetric` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `ResourceMetric` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "data",
ADD COLUMN     "params" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "ResourceMetric" DROP COLUMN "data",
DROP COLUMN "updateRate",
DROP COLUMN "updatedAt",
ADD COLUMN     "params" TEXT NOT NULL DEFAULT '';
