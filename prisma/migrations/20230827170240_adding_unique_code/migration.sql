/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `roles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `tickets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `categories_code_key` ON `categories`(`code`);

-- CreateIndex
CREATE UNIQUE INDEX `roles_code_key` ON `roles`(`code`);

-- CreateIndex
CREATE UNIQUE INDEX `tickets_code_key` ON `tickets`(`code`);

-- CreateIndex
CREATE UNIQUE INDEX `users_code_key` ON `users`(`code`);
