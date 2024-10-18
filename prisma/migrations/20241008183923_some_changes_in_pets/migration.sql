/*
  Warnings:

  - Added the required column `latitude` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "latitude" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "longitude" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "owner" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
