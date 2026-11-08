const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');

// Rota de teste (GET)
router.get('/', (req, res) => {
    res.json({ message: 'Rota de agendamentos funcionando!' });
});

// Rota de cadastro (POST)
router.post('/', agendamentoController.criarAgendamento);

module.exports = router;