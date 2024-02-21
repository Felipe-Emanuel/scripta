-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WordCount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "words" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_WordCount" ("id", "updatedAt", "userId", "words") SELECT "id", "updatedAt", "userId", "words" FROM "WordCount";
DROP TABLE "WordCount";
ALTER TABLE "new_WordCount" RENAME TO "WordCount";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
