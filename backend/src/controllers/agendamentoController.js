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
        const { texto } = req.body;

        if (!texto) {
            return res.status(400).json({ error: 'Envie o texto descritivo do agendamento!' });
        }

        // 1. O Gemini extrai os dados (incluindo o nome do cliente)
        console.log(' Processando texto com Gemini...');
        const dadosExtraidos = await extrairDadosAgendamento(texto);
        const { cliente_nome, servico, valor, data_hora } = dadosExtraidos;

        // 2. Passo inteligente: Verificar se o cliente já existe no banco pelo nome
        const buscaClienteQuery = 'SELECT id FROM clientes WHERE nome = ?';
        
        db.query(buscaClienteQuery, [cliente_nome], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar cliente no banco de dados.' });
            }

            let clienteId;

            const salvarAgendamento = (idCli) => {
                const insertAgendamento = 'INSERT INTO agendamentos (cliente_id, servico, valor, data_hora) VALUES (?, ?, ?, ?)';
                db.query(insertAgendamento, [idCli, servico, valor, data_hora], (errAg, resultAg) => {
                    if (errAg) {
                        return res.status(500).json({ error: 'Erro ao salvar agendamento.' });
                    }

                    res.status(201).json({
                        message: 'Agendamento inteligente realizado com sucesso! 🤖✨',
                        id: resultAg.insertId,
                        dadosExtraidos
                    });
                });
            };

            // Se o cliente já existe, usa o ID dele
            if (results.length > 0) {
                clienteId = results[0].id;
                salvarAgendamento(clienteId);
            } else {
                // Se o cliente NÃO existe, cadastra ele automaticamente no banco!
                const criaClienteQuery = 'INSERT INTO clientes (nome) VALUES (?)';
                db.query(criaClienteQuery, [cliente_nome], (errCreate, resultCreate) => {
                    if (errCreate) {
                        return res.status(500).json({ error: 'Erro ao cadastrar cliente automaticamente.' });
                    }
                    clienteId = resultCreate.insertId;
                    salvarAgendamento(clienteId);
                });
            }
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