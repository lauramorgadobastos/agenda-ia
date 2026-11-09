<div align="center">

#  AgendaIA | Sistema Inteligente de Agendamentos



<div align="center">

[![Node.js CI](https://img.shields.io/badge/Node.js_CI-Passing-2ea44f?style=for-the-badge&logo=nodedotjs&logoColor=white)]([https://github.com/SEU-USUARIO/SEU-REPO/actions/workflows/ci.yml](https://github.com/lauramorgadobastos/gestao-inteligente-api/actions/workflows/ci.yml))
[![Gemini SDK](https://img.shields.io/badge/Google_GenAI-Gemini_3.8_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

---

  <img src="./docs/demo.gif" alt="Demonstração do AgendaIA com Smart Autofill" width="100%">
</div>

---

##  Sobre o Projeto

O **AgendaIA** é uma aplicação full-stack moderna desenvolvida para automatizar o fluxo de agendamentos de serviços através de **Processamento de Linguagem Natural (NLP)**. 

Diferente de sistemas tradicionais que exigem preenchimentos manuais engessados ou seleções prévias de IDs de clientes, o AgendaIA utiliza a inteligência artificial do **Google Gemini** para extrair dados estruturados de frases livres, gerenciar clientes de forma autônoma (*Find or Create*) e persistir tudo em um banco de dados relacional.

---

##  Principais Diferenciais e Arquitetura

- **Smart Autofill Autônomo:** O usuário digita uma frase em linguagem natural (ex: *"Quero marcar uma escova para a Mariana amanhã às 14h por R$ 150"*). A IA extrai inteligentemente o nome, o serviço, o valor e a data.
- **Lógica *Find or Create* de Clientes:** O backend analisa automaticamente se o cliente extraído já existe no MySQL. Caso não exista, ele é cadastrado instantaneamente antes de salvar o agendamento, eliminando fricções de UX.
- **Alta Resiliência (Timeout & Fallback):** Blindado contra picos globais de tráfego da API de IA (`Erro 503`). Conta com um timeout de segurança (8s) e um extrator de fallback local para que o fluxo de testes nunca trave.
- **Interface Moderna & Responsiva:** Desenvolvida em Vanilla JavaScript, CSS Grid/Flexbox moderno, menu lateral funcional em abas e ícones padronizados via **Bootstrap Icons**.
- **DevOps & CI/CD:** Pipeline de Integração Contínua configurado via **GitHub Actions** para validação automática de sintaxe e dependências do Node.js.

---

##  Tecnologias Utilizadas

O ecossistema do projeto foi construído com tecnologias de mercado e foco em boas práticas de engenharia:

* **Backend:** Node.js, Express.js
* **Banco de Dados:** MySQL2 (Relacional)
* **Inteligência Artificial:** Google GenAI SDK (`@google/genai` com modelo `gemini-3.8-flash`)
* **Frontend:** HTML5, CSS3, JavaScript (ES6+), Bootstrap Icons
* **Automação & CI:** GitHub Actions

---

##  Estrutura do Repositório

```text
agenda-ia/
├── .github/
│   └── workflows/
│       └── ci.yml          # Pipeline de Integração Contínua
├── backend/
│   ├── src/
│   │   ├── config/         # Conexão com o banco de dados (MySQL)
│   │   ├── controllers/    # Lógica de negócio e regras de automação
│   │   ├── services/       # Integração com o Google Gemini (SDK + Fallback)
│   │   └── server.js       # Inicialização da aplicação Express
│   └── package.json
├── frontend/
│   ├── index.html          # Interface corporativa em abas
│   ├── style.css           # Estilização moderna e responsiva
│   └── script.js           # Lógica de consumo de API e navegação SPA
└── README.md

```
---

##  Como Executar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
- **Node.js** (versão 18+ recomendada)
- **MySQL Server** rodando localmente

### 1. Clonar o Repositório
```bash
git clone https://github.com/lauramorgadobastos/agenda-ia.git
cd agenda-ia
```

### 2. Configurar o Backend
```bash
cd backend
npm install
```
Crie um arquivo .env na pasta backend/ seguindo o modelo abaixo:
```bash
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario_mysql
DB_PASSWORD=sua_senha_mysql
DB_NAME=agenda_ia_db
GEMINI_API_KEY=sua_chave_da_api_do_gemini
```
### 3. Iniciar o Servidor Backend
```bash
node src/server.js
```
(O servidor rodará em http://localhost:3000)

### 4. Abrir o Frontend

Basta abrir o arquivo frontend/index.html diretamente no seu navegador de preferência (ou utilizar uma extensão como o Live Server do VS Code).

##  Endpoints da API

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/agendamentos/smart-autofill` | Processa o texto livre via IA, gerencia o cliente automaticamente e salva o agendamento. |
| `GET` | `/api/agendamentos` | Retorna a listagem de todos os agendamentos cadastrados no sistema. |
| `GET` | `/api/clientes` | Retorna a listagem de todos os clientes cadastrados no banco de dados. |

---

## Sobre Mim

Desenvolvido por *Laura Morgado Bastos Gomes*  
Estudante de *Sistemas de Informação - PUC Minas*. 

### Conecte-se comigo

Você pode me encontrar nos canais abaixo:


[![Linkedin](https://img.shields.io/badge/LinkedIn-4C1D95?style=for-the-badge&logo=linkedin&logoColor=fff)](https://www.linkedin.com/in/laura-morgado-bastos?)
[![GitHub](https://img.shields.io/badge/GitHub-4C1D95?style=for-the-badge&logo=github&logoColor=fff)](https://github.com/lauramorgadobastos) 
[![Email](https://img.shields.io/badge/Email-4C1D95?style=for-the-badge&logo=gmail&logoColor=fff)](mailto:laura.bastosmorgado27@gmail.com)

---

##  Licença

Este projeto está sob a licença **MIT**.Para mais detalhes sobre os termos, consulte o arquivo [LICENSE](https://opensource.org/licenses/MIT) ou os termos da licença MIT.

---

<div align="center">
  <sub>Desenvolvido por <b>Laura Morgado</b>.</sub>
</div>

