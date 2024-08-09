/*
  Warnings:

  - You are about to drop the column `barcode` on the `Item` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brandName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "imageURL" TEXT NOT NULL,
    "isWeighting" BOOLEAN NOT NULL,
    "barCode" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Item" ("brandName", "id", "imageURL", "isWeighting", "name", "price", "quantity", "size", "weight") SELECT "brandName", "id", "imageURL", "isWeighting", "name", "price", "quantity", "size", "weight" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_barCode_key" ON "Item"("barCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
