/*
  Warnings:

  - You are about to drop the column `portfolioUrl` on the `Reader` table. All the data in the column will be lost.
  - You are about to drop the column `portfolioUrl` on the `User` table. All the data in the column will be lost.

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
    "hits" INTEGER NOT NULL DEFAULT 0,
    "totalWords" INTEGER,
    "userId" TEXT,
    CONSTRAINT "Book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("Gender", "Theme", "conclued", "createdAt", "description", "heroPathUrl", "hits", "id", "isActive", "socialLink", "title", "totalWords", "updatedAt", "userId") SELECT "Gender", "Theme", "conclued", "createdAt", "description", "heroPathUrl", "hits", "id", "isActive", "socialLink", "title", "totalWords", "updatedAt", "userId" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE TABLE "new_Reader" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "picture" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Reader_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reader" ("createdAt", "id", "latitude", "longitude", "picture", "updatedAt", "userId", "userName") SELECT "createdAt", "id", "latitude", "longitude", "picture", "updatedAt", "userId", "userName" FROM "Reader";
DROP TABLE "Reader";
ALTER TABLE "new_Reader" RENAME TO "Reader";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "picture" TEXT,
    "rule" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "id", "name", "password", "picture", "rule", "updatedAt") SELECT "createdAt", "email", "id", "name", "password", "picture", "rule", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
