/*
  Warnings:

  - You are about to drop the column `bookId` on the `Reader` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_BookToReader" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_BookToReader_A_fkey" FOREIGN KEY ("A") REFERENCES "Book" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BookToReader_B_fkey" FOREIGN KEY ("B") REFERENCES "Reader" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reader" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "picture" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "portfolioUrl" TEXT NOT NULL,
    "authorEmail" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Reader_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reader" ("authorEmail", "createdAt", "id", "latitude", "longitude", "picture", "portfolioUrl", "updatedAt", "userEmail", "userName") SELECT "authorEmail", "createdAt", "id", "latitude", "longitude", "picture", "portfolioUrl", "updatedAt", "userEmail", "userName" FROM "Reader";
DROP TABLE "Reader";
ALTER TABLE "new_Reader" RENAME TO "Reader";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_BookToReader_AB_unique" ON "_BookToReader"("A", "B");

-- CreateIndex
CREATE INDEX "_BookToReader_B_index" ON "_BookToReader"("B");
