-- Rodar UMA vez no MySQL da Hostinger (phpMyAdmin → banco do site → aba SQL).
-- Tabela dos textos da página inicial, editáveis em Admin → Textos do site.

-- CreateTable
CREATE TABLE `SiteText` (
    `key` VARCHAR(191) NOT NULL,
    `value` TEXT NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
