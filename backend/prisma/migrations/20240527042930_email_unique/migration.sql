/*
  Warnings:

  - The values [Inteira,Meia-Entrada,Isenção] on the enum `ingresso_ingresso_tipo` will be removed. If these variants are still used in the database, this will fail.
  - The values [Funcionário] on the enum `usuario_tipo` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `ingresso` MODIFY `ingresso_tipo` ENUM('Total', 'Hospedagem', 'Pro') NULL;

-- AlterTable
ALTER TABLE `preco` ADD COLUMN `ingresso_tipo` ENUM('Total', 'Hospedagem', 'Pro') NULL;

-- AlterTable
ALTER TABLE `usuario` MODIFY `tipo` ENUM('Administrador', 'Funcionario', 'Cliente') NULL;
