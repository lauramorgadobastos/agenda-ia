const { GoogleGenAI } = require('@google/genai');

// Inicializa o SDK do Gemini (ele busca automaticamente a GEMINI_API_KEY do seu arquivo .env)
const ai = new GoogleGenAI();

const extrairDadosAgendamento = async (textoUsuario) => {
    try {
        // Prompt instruindo o Gemini a atuar como um extrator de dados estruturados
        const prompt = `
        Você é um assistente de IA especializado em preenchimento inteligente (smart autofill) para um sistema de gestão de agendamentos.
        Analise o texto fornecido pelo usuário e extraia as seguintes informações estritamente em formato JSON:
        - "servico": O nome do serviço mencionado (string).
        - "valor": O valor numérico do serviço (número float, ex: 50.00). Se não houver valor, retorne 0.
        - "data_hora": A data e hora no formato ISO "YYYY-MM-DD HH:MM:SS". Assuma o ano atual de 2026 se não especificado pelo usuário.

        Texto do usuário: "${textoUsuario}"

        Retorne APENAS o objeto JSON válido, sem blocos de código markdown ou explicações adicionais, contendo exatamente as chaves: "servico", "valor", "data_hora".
        `;

        // Chamada oficial para o modelo do Gemini
        const response = await ai.models.generateContent({
            model: 'gemini-3.8-flash',
            contents: prompt,
        });

        let textoResposta = response.text.trim();

        // Remove eventuais marcações de bloco de código markdown que a IA possa retornar
        textoResposta = textoResposta.replace(/```json/g, '').replace(/```/g, '').trim();

        // Converte a string JSON limpa em um Objeto JavaScript real
        const dadosEstruturados = JSON.parse(textoResposta);
        return dadosEstruturados;

    } catch (error) {
        console.error('❌ Erro ao processar dados com o Gemini:', error.message);
        throw new Error('Falha ao extrair dados inteligentes via IA.');
    }
};

module.exports = {
    extrairDadosAgendamento
};