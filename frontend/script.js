// --- Lógica de Navegação do Menu Lateral ---
const navLinks = document.querySelectorAll('.nav-link');
const viewSections = document.querySelectorAll('.view-section');
const pageTitle = document.getElementById('pageTitle');

const pageTitles = {
    agendamentos: 'Novo Agendamento Inteligente',
    clientes: 'Gerenciamento de Clientes',
    ia: 'Painel do Assistente IA'
};

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active de todos os links e adiciona no clicado
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Oculta todas as seções de tela
        viewSections.forEach(sec => sec.classList.add('hidden'));

        // Mostra somente a seção alvo
        const target = link.getAttribute('data-target');
        document.getElementById(`view-${target}`).classList.remove('hidden');

        // Atualiza o título do topo da página
        pageTitle.textContent = pageTitles[target];
    });
});

// --- Lógica do Smart Autofill (Formulário) ---
const form = document.getElementById('agendamentoForm');
const btnEnviar = document.getElementById('btnEnviar');
const loading = document.getElementById('loading');
const resultado = document.getElementById('resultado');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const cliente_id = document.getElementById('clienteId').value;
        const texto = document.getElementById('textoIA').value;

        resultado.classList.add('hidden');
        loading.classList.remove('hidden');
        btnEnviar.disabled = true;

        try {
            const response = await fetch('http://localhost:3000/api/agendamentos/smart-autofill', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cliente_id: Number(cliente_id), texto })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao processar agendamento.');
            }

            const extraidos = data.dadosExtraidos;
            resultado.className = '';
            resultado.innerHTML = `
                <div class="success-box">
                    <h3><i class="bi bi-check-circle-fill"></i> Agendamento Salvo com Sucesso!</h3>
                    <div class="result-item">
                        <span><strong>ID do Registro:</strong></span>
                        <span>#${data.id}</span>
                    </div>
                    <div class="result-item">
                        <span><strong>Cliente ID:</strong></span>
                        <span>${data.cliente_id}</span>
                    </div>
                    <div class="result-item">
                        <span><strong>Serviço:</strong></span>
                        <span>${extraidos.servico}</span>
                    </div>
                    <div class="result-item">
                        <span><strong>Valor:</strong></span>
                        <span>R$ ${Number(extraidos.valor).toFixed(2)}</span>
                    </div>
                    <div class="result-item">
                        <span><strong>Data e Hora:</strong></span>
                        <span>${extraidos.data_hora}</span>
                    </div>
                </div>
            `;
            
            form.reset();
            document.getElementById('clienteId').value = cliente_id;

        } catch (error) {
            resultado.className = '';
            resultado.innerHTML = `
                <div class="error-box">
                    <strong><i class="bi bi-exclamation-triangle-fill"></i> Falha na operação:</strong><br>${error.message}
                </div>
            `;
        } finally {
            loading.classList.add('hidden');
            resultado.classList.remove('hidden');
            btnEnviar.disabled = false;
        }
    });
}