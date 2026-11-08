-- Cria o banco de dados caso ele não exista
CREATE DATABASE IF NOT EXISTS sistema_gestao;
USE sistema_gestao;

-- Tabela de Clientes
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(50),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Agendamentos / Serviços
CREATE TABLE IF NOT EXISTS agendamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    servico VARCHAR(255) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    data_hora DATETIME NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cliente_agendamento FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);