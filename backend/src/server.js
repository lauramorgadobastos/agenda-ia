const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importa a conexão com o banco (apenas para testar se roda)
require('./config/db');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota de teste simples
app.get('/', (req, res) => {
    res.json({ message: 'API do Sistema de Gestão Inteligente rodando com sucesso!' });
});

// Definindo a porta do servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(` Servidor rodando na porta ${PORT}`);
});