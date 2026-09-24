-- Adiciona coluna showInStories ao Couple: separa "aparecer em Histórias reais"
-- de "entrar no Próximo casamento da home". Novos casais começam fora das
-- Histórias reais; os exemplos colocados pelos desenvolvedores continuam lá.
ALTER TABLE `Couple` ADD COLUMN `showInStories` BOOLEAN NOT NULL DEFAULT false AFTER `published`;
UPDATE `Couple` SET `showInStories` = true WHERE `slug` IN ('casal-1', 'casal-2', 'casal-3');
