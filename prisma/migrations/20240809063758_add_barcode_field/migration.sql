/*
  Warnings:

  - A unique constraint covering the columns `[barcode]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Item_barcode_key" ON "Item"("barcode");
