-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `cargo` ENUM('Faxina', 'Guia', 'Guarda', 'Atendente', 'Conserto', 'Vendedor') NULL,
    ADD COLUMN `salario` DECIMAL(10, 2) NULL;
