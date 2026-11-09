const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');
const { extrairDadosAgendamento } = require('../services/geminiService');

// Rota de teste (GET)
router.get('/', (req, res) => {
    res.json({ message: 'Rota de agendamentos funcionando!' });
});

// Rota de cadastro manual (POST)
router.post('/', agendamentoController.criarAgendamento);

//  Testar a extração inteligente via Gemini
router.post('/ia', async (req, res) => {
    try {
        const { texto } = req.body;

        if (!texto) {
            return res.status(400).json({ error: 'Envie um campo "texto" no body da requisição.' });
        }

        // Chama o serviço do Gemini
        const dadosExtraidos = await extrairDadosAgendamento(texto);

        res.json({
            message: 'Dados extraídos com sucesso pelo Gemini!',
            dadosExtraidos
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Smart Autofill (IA + Banco de Dados)
router.post('/smart-autofill', agendamentoController.criarComIA);

module.exports = router;