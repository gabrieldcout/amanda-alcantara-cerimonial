-- Rodar UMA vez no MySQL da Hostinger (phpMyAdmin → banco do site → aba SQL).
-- Tabela das fotos fixas da página inicial, editáveis em Admin → Fotos do site.

-- CreateTable
CREATE TABLE `SitePhoto` (
    `slot` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`slot`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
