-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_assignedToUserId_fkey` FOREIGN KEY (`assignedToUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
