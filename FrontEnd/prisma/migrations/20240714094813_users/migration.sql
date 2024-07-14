-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateDate" DATETIME NOT NULL
);
