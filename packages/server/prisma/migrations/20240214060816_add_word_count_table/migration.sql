/*
  Warnings:

  - You are about to drop the column `wordsWrittedToday` on the `User` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "WordCount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "words" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "picture" TEXT,
    "rule" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "expirationTime" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "wordCountId" TEXT,
    CONSTRAINT "User_wordCountId_fkey" FOREIGN KEY ("wordCountId") REFERENCES "WordCount" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("accessToken", "createdAt", "email", "expirationTime", "id", "name", "password", "picture", "rule", "updatedAt") SELECT "accessToken", "createdAt", "email", "expirationTime", "id", "name", "password", "picture", "rule", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
