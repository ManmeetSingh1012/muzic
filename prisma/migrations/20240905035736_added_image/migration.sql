-- AlterTable
ALTER TABLE `stream` ADD COLUMN `bigImg` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `smallImg` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `title` VARCHAR(191) NOT NULL DEFAULT '';
