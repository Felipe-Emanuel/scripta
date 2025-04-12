/*
  Warnings:

  - You are about to drop the column `email` on the `Goal` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Goal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "goalComplete" BOOLEAN NOT NULL,
    "goalCompletePercent" REAL NOT NULL,
    "words" INTEGER NOT NULL,
    "goal" INTEGER NOT NULL
);
INSERT INTO "new_Goal" ("createdAt", "goal", "goalComplete", "goalCompletePercent", "id", "updatedAt", "words") SELECT "createdAt", "goal", "goalComplete", "goalCompletePercent", "id", "updatedAt", "words" FROM "Goal";
DROP TABLE "Goal";
ALTER TABLE "new_Goal" RENAME TO "Goal";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
