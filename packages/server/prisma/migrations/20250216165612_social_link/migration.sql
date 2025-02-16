/*
  Warnings:

  - You are about to drop the column `publishedUrl` on the `Book` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "socialLink" TEXT,
    "heroPathUrl" TEXT NOT NULL,
    "conclued" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "Gender" TEXT,
    "Theme" TEXT,
    "hits" INTEGER NOT NULL,
    "totalWords" INTEGER,
    "userEmail" TEXT,
    CONSTRAINT "Book_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User" ("email") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("Gender", "Theme", "conclued", "createdAt", "description", "heroPathUrl", "hits", "id", "isActive", "title", "totalWords", "updatedAt", "userEmail") SELECT "Gender", "Theme", "conclued", "createdAt", "description", "heroPathUrl", "hits", "id", "isActive", "title", "totalWords", "updatedAt", "userEmail" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
