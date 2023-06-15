/*
  Warnings:

  - Added the required column `image` to the `Motorcycles` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Motorcycles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "displacement" TEXT NOT NULL,
    "rate" REAL NOT NULL,
    "price" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" TEXT NOT NULL,
    "rent_by" TEXT NOT NULL
);
INSERT INTO "new_Motorcycles" ("brand", "createdAt", "displacement", "id", "name", "price", "rate", "rent_by") SELECT "brand", "createdAt", "displacement", "id", "name", "price", "rate", "rent_by" FROM "Motorcycles";
DROP TABLE "Motorcycles";
ALTER TABLE "new_Motorcycles" RENAME TO "Motorcycles";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
