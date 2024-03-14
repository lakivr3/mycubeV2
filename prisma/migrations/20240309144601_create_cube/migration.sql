-- CreateTable
CREATE TABLE `Cube` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `img` TEXT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `status` ENUM('AVAILABLE', 'NOT_AVAILABLE') NOT NULL DEFAULT 'AVAILABLE',
    `price` DECIMAL(4, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
