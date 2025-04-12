/*
  Warnings:

  - You are about to drop the column `userEmail` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `authorEmail` on the `Reader` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `Reader` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Reader` table without a default value. This is not possible if the table is not empty.

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
    "hits" INTEGER NOT NULL,
    "totalWords" INTEGER,
    "userId" TEXT,
    CONSTRAINT "Book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Book" ("Gender", "Theme", "conclued", "createdAt", "description", "heroPathUrl", "hits", "id", "isActive", "socialLink", "title", "totalWords", "updatedAt") SELECT "Gender", "Theme", "conclued", "createdAt", "description", "heroPathUrl", "hits", "id", "isActive", "socialLink", "title", "totalWords", "updatedAt" FROM "Book";
DROP TABLE "Book";
ALTER TABLE "new_Book" RENAME TO "Book";
CREATE TABLE "new_Feedback" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,
    "screenshot" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Feedback" ("createdAt", "feedback", "id", "screenshot", "type", "updatedAt") SELECT "createdAt", "feedback", "id", "screenshot", "type", "updatedAt" FROM "Feedback";
DROP TABLE "Feedback";
ALTER TABLE "new_Feedback" RENAME TO "Feedback";
CREATE TABLE "new_Reader" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "picture" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "portfolioUrl" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Reader_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reader" ("createdAt", "id", "latitude", "longitude", "picture", "portfolioUrl", "updatedAt", "userName") SELECT "createdAt", "id", "latitude", "longitude", "picture", "portfolioUrl", "updatedAt", "userName" FROM "Reader";
DROP TABLE "Reader";
ALTER TABLE "new_Reader" RENAME TO "Reader";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
