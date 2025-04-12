-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reader" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "picture" TEXT,
    "userName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "latitude" REAL,
    "longitude" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Reader_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reader" ("createdAt", "id", "latitude", "longitude", "picture", "updatedAt", "userId", "userName") SELECT "createdAt", "id", "latitude", "longitude", "picture", "updatedAt", "userId", "userName" FROM "Reader";
DROP TABLE "Reader";
ALTER TABLE "new_Reader" RENAME TO "Reader";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
