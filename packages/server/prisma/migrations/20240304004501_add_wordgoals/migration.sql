/*
  Warnings:

  - Added the required column `wordGoals` to the `WordCount` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WordCount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "words" INTEGER NOT NULL,
    "wordGoals" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "wordsCounterId" TEXT,
    CONSTRAINT "WordCount_wordsCounterId_fkey" FOREIGN KEY ("wordsCounterId") REFERENCES "WordsCounter" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_WordCount" ("createdAt", "email", "id", "updatedAt", "words", "wordsCounterId") SELECT "createdAt", "email", "id", "updatedAt", "words", "wordsCounterId" FROM "WordCount";
DROP TABLE "WordCount";
ALTER TABLE "new_WordCount" RENAME TO "WordCount";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
