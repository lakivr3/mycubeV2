/*
  Warnings:

  - You are about to alter the column `price` on the `cube` table. The data in that column could be lost. The data in that column will be cast from `Decimal(4,2)` to `Double`.

*/
-- AlterTable
ALTER TABLE `cube` MODIFY `price` DOUBLE NOT NULL DEFAULT 0.00;
