/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `tickets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tickets_code_key" ON "tickets"("code");
