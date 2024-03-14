/*
  Warnings:

  - You are about to drop the column `assignedToUserId` on the `review` table. All the data in the column will be lost.
  - Added the required column `image` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_assignedToUserId_fkey`;

-- AlterTable
ALTER TABLE `review` DROP COLUMN `assignedToUserId`,
    ADD COLUMN `image` VARCHAR(255) NOT NULL,
    ADD COLUMN `user` VARCHAR(255) NOT NULL;
