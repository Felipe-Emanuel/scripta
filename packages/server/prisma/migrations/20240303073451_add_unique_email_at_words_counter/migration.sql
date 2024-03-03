/*
  Warnings:

  - Added the required column `email` to the `WordsCounter` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WordsCounter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL
);
INSERT INTO "new_WordsCounter" ("id") SELECT "id" FROM "WordsCounter";
DROP TABLE "WordsCounter";
ALTER TABLE "new_WordsCounter" RENAME TO "WordsCounter";
CREATE UNIQUE INDEX "WordsCounter_email_key" ON "WordsCounter"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
