/*
  Warnings:

  - You are about to drop the `ResourceMetric` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `resourceId` to the `Metric` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ResourceMetric" DROP CONSTRAINT "ResourceMetric_metricId_fkey";

-- DropForeignKey
ALTER TABLE "ResourceMetric" DROP CONSTRAINT "ResourceMetric_resourceId_fkey";

-- AlterTable
ALTER TABLE "Metric" ADD COLUMN     "params" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "resourceId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ResourceMetric";

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
