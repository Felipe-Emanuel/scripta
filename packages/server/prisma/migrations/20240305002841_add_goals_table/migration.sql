-- CreateTable
CREATE TABLE "Goals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "goalComplete" BOOLEAN NOT NULL,
    "goalCompletePercent" REAL NOT NULL,
    "day" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,
    "month" INTEGER NOT NULL
);
