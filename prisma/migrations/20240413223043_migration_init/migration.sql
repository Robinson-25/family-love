-- CreateTable
CREATE TABLE `hotelcenter` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `reference` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `mapUrl` VARCHAR(2000) NOT NULL,
    `description` VARCHAR(10000) NOT NULL,
    `urlSegment` VARCHAR(191) NOT NULL,
    `cellPhone` VARCHAR(191) NULL,
    `garage` BOOLEAN NOT NULL DEFAULT false,
    `phone` VARCHAR(191) NULL,

    UNIQUE INDEX `hotelcenter_name_key`(`name`),
    UNIQUE INDEX `hotelcenter_address_key`(`address`),
    UNIQUE INDEX `hotelcenter_urlSegment_key`(`urlSegment`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room` (
    `id` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `adults` INTEGER NOT NULL,
    `bedType` VARCHAR(191) NOT NULL,
    `children` INTEGER NOT NULL,
    `description` VARCHAR(5000) NOT NULL,
    `roomNumber` INTEGER NOT NULL,
    `target` VARCHAR(5000) NOT NULL,
    `view` VARCHAR(191) NOT NULL,
    `hotelCenterId` VARCHAR(191) NOT NULL,
    `floor` INTEGER NOT NULL,
    `roomTypeId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `amenitie` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `amenitie_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('customer', 'admin', 'colaborator') NOT NULL,
    `emailVerified` DATETIME(3) NULL,

    UNIQUE INDEX `user_username_key`(`username`),
    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roomtype` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `roomtype_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `image` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `hotelCenterId` VARCHAR(191) NULL,
    `roomId` VARCHAR(191) NULL,
    `public_id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,

    UNIQUE INDEX `image_url_key`(`url`),
    UNIQUE INDEX `image_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Service_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booking` (
    `id` VARCHAR(191) NOT NULL,
    `checkIn` DATETIME(3) NOT NULL,
    `checkOut` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_amenitieToroom` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_amenitieToroom_AB_unique`(`A`, `B`),
    INDEX `_amenitieToroom_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_bookingToroom` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_bookingToroom_AB_unique`(`A`, `B`),
    INDEX `_bookingToroom_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
