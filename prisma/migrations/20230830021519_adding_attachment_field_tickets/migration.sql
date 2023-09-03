/*
  Warnings:

  - Added the required column `attachments` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tickets` ADD COLUMN `attachments` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `tickets` ADD CONSTRAINT `tickets_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
