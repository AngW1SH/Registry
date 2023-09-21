-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "developerRequirements" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "enrollmentStart" TIMESTAMP(3) NOT NULL,
    "enrollmentEnd" TIMESTAMP(3) NOT NULL,
    "supervisor" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
