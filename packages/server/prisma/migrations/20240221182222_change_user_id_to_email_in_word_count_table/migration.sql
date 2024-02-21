/*
  Warnings:

  - You are about to drop the column `userId` on the `WordCount` table. All the data in the column will be lost.
  - Added the required column `email` to the `WordCount` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WordCount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "words" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_WordCount" ("createdAt", "id", "updatedAt", "words") SELECT "createdAt", "id", "updatedAt", "words" FROM "WordCount";
DROP TABLE "WordCount";
ALTER TABLE "new_WordCount" RENAME TO "WordCount";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
