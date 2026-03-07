/*
  Warnings:

  - Added the required column `transactionId` to the `booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `booking` ADD COLUMN `cellPhone` VARCHAR(191) NULL,
    ADD COLUMN `paymentStatus` ENUM('paid', 'pending') NOT NULL DEFAULT 'pending',
    ADD COLUMN `transactionId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `newsletterEmail` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `newsletterEmail_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
