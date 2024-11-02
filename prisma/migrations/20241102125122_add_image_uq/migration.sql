/*
  Warnings:

  - A unique constraint covering the columns `[config_hash]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Image_config_hash_key" ON "Image"("config_hash");
