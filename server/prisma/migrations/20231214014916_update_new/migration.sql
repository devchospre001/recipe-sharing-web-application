-- AlterTable
ALTER TABLE "recipes" ALTER COLUMN "keywords" SET NOT NULL,
ALTER COLUMN "keywords" SET DATA TYPE TEXT;
-- Napisati down migracije