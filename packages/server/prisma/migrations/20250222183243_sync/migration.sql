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
    "hits" INTEGER NOT NULL DEFAULT 0,
    "totalWords" INTEGER DEFAULT 0,
    "userId" TEXT,
    CONSTRAINT "Book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("Gender", "Theme", "conclued", "createdAt", "description", "heroPathUrl", "hits", "id", "isActive", "socialLink", "title", "totalWords", "updatedAt", "userId") SELECT "Gender", "Theme", "conclued", "createdAt", "description", "heroPathUrl", "hits", "id", "isActive", "socialLink", "title", "totalWords", "updatedAt", "userId" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
