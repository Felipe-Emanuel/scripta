/*
  Warnings:

  - Added the required column `firstLineIndent` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fontSize` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fontWeight` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lineHeight` to the `Chapter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opened` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chapter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chapterTitle" TEXT NOT NULL,
    "chapterText" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "bookId" TEXT NOT NULL,
    "wordsCounter" INTEGER NOT NULL,
    "firstLineIndent" TEXT NOT NULL,
    "lineHeight" TEXT NOT NULL,
    "fontSize" TEXT NOT NULL,
    "fontWeight" TEXT NOT NULL,
    "opened" BOOLEAN NOT NULL,
    CONSTRAINT "Chapter_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Chapter" ("bookId", "chapterText", "chapterTitle", "createdAt", "id", "updatedAt", "wordsCounter") SELECT "bookId", "chapterText", "chapterTitle", "createdAt", "id", "updatedAt", "wordsCounter" FROM "Chapter";
DROP TABLE "Chapter";
ALTER TABLE "new_Chapter" RENAME TO "Chapter";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
