const db = require('../config/db');

// Função para cadastrar um novo agendamento
const criarAgendamento = (req, res) => {
    const { cliente_id, servico, valor, data_hora } = req.body;

    // Validação simples para garantir que os campos obrigatórios foram enviados
    if (!cliente_id || !servico || !valor || !data_hora) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }

    const query = 'INSERT INTO agendamentos (cliente_id, servico, valor, data_hora) VALUES (?, ?, ?, ?)';
    
    db.query(query, [cliente_id, servico, valor, data_hora], (err, result) => {
        if (err) {
            console.error('❌ Erro ao salvar agendamento:', err.message);
            return res.status(500).json({ error: 'Erro interno no servidor ao salvar agendamento.' });
        }

        res.status(201).json({
            message: 'Agendamento criado com sucesso!',
            id: result.insertId,
            cliente_id,
            servico,
            valor,
            data_hora
        });
    });
};

module.exports = {
    criarAgendamento
};