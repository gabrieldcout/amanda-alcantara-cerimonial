-- Rodar UMA vez no MySQL da Hostinger (phpMyAdmin → banco do site → aba SQL).
-- 1) Couple.showInStories: separa "aparecer em Histórias reais" de "entrar no
--    Próximo casamento da home". Os exemplos (casal-1/2/3) continuam visíveis.
-- 2) Tabelas do Checklist dos noivos.

-- AlterTable
ALTER TABLE `Couple` ADD COLUMN `showInStories` BOOLEAN NOT NULL DEFAULT false AFTER `published`;
UPDATE `Couple` SET `showInStories` = true WHERE `slug` IN ('casal-1', 'casal-2', 'casal-3');

-- CreateTable
CREATE TABLE `ClientChecklist` (
    `id` VARCHAR(191) NOT NULL,
    `coupleId` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ClientChecklist_coupleId_key`(`coupleId`),
    UNIQUE INDEX `ClientChecklist_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChecklistItem` (
    `id` VARCHAR(191) NOT NULL,
    `checklistId` VARCHAR(191) NOT NULL,
    `phase` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `note` TEXT NULL,
    `done` BOOLEAN NOT NULL DEFAULT false,
    `doneAt` DATETIME(3) NULL,
    `priority` BOOLEAN NOT NULL DEFAULT false,
    `notApplicable` BOOLEAN NOT NULL DEFAULT false,
    `notApplicableByCouple` BOOLEAN NOT NULL DEFAULT false,
    `addedByCouple` BOOLEAN NOT NULL DEFAULT false,
    `order` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ChecklistItem_checklistId_idx`(`checklistId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ClientChecklist` ADD CONSTRAINT `ClientChecklist_coupleId_fkey` FOREIGN KEY (`coupleId`) REFERENCES `Couple`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChecklistItem` ADD CONSTRAINT `ChecklistItem_checklistId_fkey` FOREIGN KEY (`checklistId`) REFERENCES `ClientChecklist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

