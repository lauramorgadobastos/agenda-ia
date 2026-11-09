const db = require('../config/db');
const { extrairDadosAgendamento } = require('../services/geminiService');

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

//  Cria agendamento usando IA a partir de texto livre
const criarComIA = async (req, res) => {
    try {
        const { texto, cliente_id } = req.body;

        if (!texto || !cliente_id) {
            return res.status(400).json({ error: 'Envie o texto descritivo e o cliente_id!' });
        }

        //  Pede para o Gemini extrair os dados estruturados do texto
        console.log(' Processando texto com Gemini...');
        const dadosExtraidos = await extrairDadosAgendamento(texto);
        const { servico, valor, data_hora } = dadosExtraidos;

        // Salva automaticamente no MySQL
        const query = 'INSERT INTO agendamentos (cliente_id, servico, valor, data_hora) VALUES (?, ?, ?, ?)';

        db.query(query, [cliente_id, servico, valor, data_hora], (err, result) => {
            if (err) {
                console.error('❌ Erro ao salvar agendamento via IA no MySQL:', err.message);
                return res.status(500).json({ error: 'Erro ao salvar agendamento no banco de dados.' });
            }

            res.status(201).json({
                message: 'Agendamento criado e preenchido com IA com sucesso! 🤖✨',
                id: result.insertId,
                cliente_id,
                dadosExtraidos
            });
        });

    } catch (error) {
        console.error('❌ Erro na rota Smart Autofill:', error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    criarAgendamento,
    criarComIA
};