-- AlterTable
ALTER TABLE "brands" ADD COLUMN     "logoAlt" TEXT;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "galleryAlts" TEXT[],
ADD COLUMN     "imageAlt" TEXT;
