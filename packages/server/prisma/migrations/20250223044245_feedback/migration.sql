-- AlterTable
ALTER TABLE "User" ADD COLUMN "feedbackId" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Feedback" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,
    "screenshot" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Feedback" ("createdAt", "feedback", "id", "screenshot", "type", "updatedAt", "userId") SELECT "createdAt", "feedback", "id", "screenshot", "type", "updatedAt", "userId" FROM "Feedback";
DROP TABLE "Feedback";
ALTER TABLE "new_Feedback" RENAME TO "Feedback";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
