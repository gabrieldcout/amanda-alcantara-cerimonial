-- Adiciona colunas cpf e birthDate ao BrideUser (pra recuperação de senha).
-- Defaults temporários são necessários porque BrideUser pode já ter registros;
-- usuárias existentes precisariam re-cadastrar os dados manualmente.
ALTER TABLE `BrideUser`
  ADD COLUMN `cpf` VARCHAR(191) NOT NULL DEFAULT '',
  ADD COLUMN `birthDate` DATETIME(3) NOT NULL DEFAULT '2000-01-01 00:00:00.000';
