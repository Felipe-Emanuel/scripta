/*
  Warnings:

  - You are about to drop the column `wordCountId` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `WordCount` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WordCount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "words" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL
);
INSERT INTO "new_WordCount" ("id", "updatedAt", "words") SELECT "id", "updatedAt", "words" FROM "WordCount";
DROP TABLE "WordCount";
ALTER TABLE "new_WordCount" RENAME TO "WordCount";
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
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("accessToken", "createdAt", "email", "expirationTime", "id", "name", "password", "picture", "rule", "updatedAt") SELECT "accessToken", "createdAt", "email", "expirationTime", "id", "name", "password", "picture", "rule", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
