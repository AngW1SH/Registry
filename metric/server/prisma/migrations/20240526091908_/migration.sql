/*
  Warnings:

  - You are about to drop the column `platformId` on the `Identifier` table. All the data in the column will be lost.
  - You are about to drop the `Platform` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Identifier" DROP CONSTRAINT "Identifier_platformId_fkey";

-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_platformId_fkey";

-- AlterTable
ALTER TABLE "Identifier" DROP COLUMN "platformId",
ADD COLUMN     "platform" TEXT NOT NULL DEFAULT 'GitHub';

-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "platform" TEXT NOT NULL DEFAULT 'GitHub';

-- DropTable
DROP TABLE "Platform";
