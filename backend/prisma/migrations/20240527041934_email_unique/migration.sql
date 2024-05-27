-- CreateTable
CREATE TABLE `ingresso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cliente_id` INTEGER NULL,
    `codigo` VARCHAR(100) NULL,
    `valor_pago` DECIMAL(8, 2) NULL,
    `data_pedido` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `data_visita` DATE NULL,
    `data_utilizacao` TIMESTAMP(0) NULL,
    `ingresso_tipo` ENUM('Inteira', 'Meia-Entrada', 'Isenção') NULL,

    UNIQUE INDEX `codigo_ingresso_UNIQUE`(`codigo`),
    INDEX `fk_pedido_cliente1_idx`(`cliente_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `preco` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `preco` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_completo` VARCHAR(50) NULL,
    `usuario` VARCHAR(50) NULL,
    `email` VARCHAR(255) NULL,
    `senha` VARCHAR(100) NULL,
    `tipo` ENUM('Administrador', 'Funcionário', 'Cliente') NULL,
    `telefone` VARCHAR(20) NULL,
    `nascimento` DATE NULL,
    `cpf` CHAR(11) NULL,
    `cnpj` CHAR(14) NULL,

    UNIQUE INDEX `usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ingresso` ADD CONSTRAINT `fk_pedido_cliente1` FOREIGN KEY (`cliente_id`) REFERENCES `usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
