/*
  Warnings:

  - You are about to drop the `Goals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WordCount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WordsCounter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Goals";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "WordCount";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "WordsCounter";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "goalComplete" BOOLEAN NOT NULL,
    "goalCompletePercent" REAL NOT NULL,
    "words" INTEGER NOT NULL,
    "goal" INTEGER NOT NULL
);
