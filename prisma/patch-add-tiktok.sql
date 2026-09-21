-- Adiciona coluna tiktokUrl ao SiteSettings
ALTER TABLE `SiteSettings` ADD COLUMN `tiktokUrl` VARCHAR(191) NULL AFTER `instagramUrl`;
