-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ResourceMetric" DROP CONSTRAINT "ResourceMetric_resourceId_fkey";

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceMetric" ADD CONSTRAINT "ResourceMetric_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
