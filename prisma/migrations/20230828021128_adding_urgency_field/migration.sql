/*
  Warnings:

  - Added the required column `urgency` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tickets` ADD COLUMN `urgency` VARCHAR(191) NOT NULL;
