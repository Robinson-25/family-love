/*
  Warnings:

  - You are about to drop the `_bookingtoroom` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `roomId` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `creationMode` ENUM('manual', 'paid') NOT NULL DEFAULT 'paid',
    ADD COLUMN `roomId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `_bookingtoroom`;
