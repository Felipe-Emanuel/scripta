-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chapter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "isConclued" BOOLEAN NOT NULL DEFAULT false,
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
    CONSTRAINT "Chapter_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Chapter" ("bookId", "chapterText", "chapterTitle", "createdAt", "firstLineIndent", "fontSize", "fontWeight", "id", "lineHeight", "updatedAt", "wordsCounter") SELECT "bookId", "chapterText", "chapterTitle", "createdAt", "firstLineIndent", "fontSize", "fontWeight", "id", "lineHeight", "updatedAt", "wordsCounter" FROM "Chapter";
DROP TABLE "Chapter";
ALTER TABLE "new_Chapter" RENAME TO "Chapter";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
